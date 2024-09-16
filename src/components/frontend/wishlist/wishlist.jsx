import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeWishlist } from '../../../redux/actions/wishlistActions'; 
import { selectWishlistItems } from '../../../redux/selectors/wishlistSelector';
import { addToWishlist, fetchWishlistByUserId } from '../../../redux/actions/APIActions';
import { Trash2 } from 'react-feather'; 
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);
  const [isFavorite, setIsFavorite] = useState([]);
  const fetchedWishlist = useSelector((state) => state.apireducer.fetchedWishlist) || {};
  const fetchedProducts = useSelector(state => state.apireducer.fetchedProducts);

  const token = Cookies.get('token');
  const userId = Cookies.get('userId');

  useEffect(() => {
    if (token && userId) {
      if (!isFavorite || isFavorite.length === 0) {
        const products = fetchedWishlist.products || [];
        const matchedProducts = fetchedProducts.filter(product =>
          products.some(p => p.productId === product._id)
        );
        setIsFavorite(matchedProducts);
      }
    } else {
      setIsFavorite(wishlistItems);
    }
  }, [token, userId, fetchedWishlist, fetchedProducts, wishlistItems, isFavorite]); 

  const handleRemove = (productId) => {
    if (token && userId) {
        dispatch(addToWishlist(userId, productId))
        .then(() => {
          dispatch(fetchWishlistByUserId(userId));
          setIsFavorite(prev => prev.filter(item => item._id !== productId));
          toast.success('Product Removed From wishlist successful!', { autoClose: 3000 });
        })
        .catch((error) => {
          toast.error('Failed to add product to wishlist', { autoClose: 5000 });
        });
    } else {
      const updatedWishlist = isFavorite.filter(item => item._id !== productId);
      dispatch(removeWishlist(productId));
      setIsFavorite(updatedWishlist);
      toast.success('Product Removed From wishlist successful!', { autoClose: 3000 });
    }
  };

  return (
    <div className='bg-primary'>
      <div className="p-2 h-80vh">
          <div className="m-4 px-4 py-6 rounded-lg bg-white">
            <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
            {isFavorite.length === 0 ? (
              <p className="text-gray-500">Your wishlist is empty.</p>
            ) : (
              <ul className="space-y-4 px-4">
              {isFavorite.map((item) => (
                  <li key={item._id} className="flex items-center justify-between border-b pb-2 mb-2">
                  <div className="flex items-center">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4" />
                      <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-gray-600">${item.price.toFixed(2)}</p>
                      </div>
                  </div>
                  <div className="flex items-center space-x-4">
                      <button
                      onClick={() => handleRemove(item._id)}
                      className="text-red-500 hover:text-red-700"
                      aria-label="Remove from wishlist"
                      >
                      <Trash2 className="w-5 h-5" />
                      </button>
                  </div>
                  </li>
              ))}
              </ul>
            )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Wishlist;
