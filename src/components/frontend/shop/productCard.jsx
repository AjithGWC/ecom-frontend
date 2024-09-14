import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Heart } from 'react-feather'; 
import { useDispatch, useSelector } from 'react-redux';
import { setCart } from '../../../redux/actions/cartActions';
import Cookies from 'js-cookie';
import { setWishlist, removeWishlist } from '../../../redux/actions/wishlistActions';
import { addToWishlist, fetchWishlistByUserId } from '../../../redux/actions/APIActions';
import { selectWishlistItems } from '../../../redux/selectors/wishlistSelector';

const ProductCard = ({ productItem }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlistItems = useSelector(selectWishlistItems);
  const [quantity, setQuantity] = useState(1); 
  const [isFavorite, setIsFavorite] = useState(false);
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const fetchedWishlist = useSelector((state) => state.apireducer.fetchedWishlist) || {};

  useEffect(() => {
    const storedToken = Cookies.get('token');
    const storedUserId = Cookies.get('userId');

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedUserId) {      
      setUserId(storedUserId);
    }

    const checkFavoriteStatus = () => {
      if (storedToken && storedUserId) {
        const products = fetchedWishlist.products || [];
        const isProductInWishlist = products.some(item => item.productId === productItem._id);
        setIsFavorite(isProductInWishlist);
      } else {
        const isProductInWishlist = wishlistItems.some(item => item._id === productItem._id);
        setIsFavorite(isProductInWishlist);
      }
    };

    checkFavoriteStatus();

    // const intervalId = setInterval(() => {
    //   if (storedToken && storedUserId) {
    //     dispatch(fetchWishlistByUserId(userId, token));
    //   }
    // }, 1000);

    return () => clearInterval(intervalId);
  }, [wishlistItems, productItem._id, fetchedWishlist, token, userId, dispatch]);

  const handleClick = () => {
    navigate(`/product/${productItem._id}`);
  };

  const handleAdd = async () => {
    if (token) {
      try {
        const cartResponse = await fetch(`https://ecommerce-backend-mdiu.onrender.com/cart/${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ 
            productId: productItem._id, 
            quantity: quantity 
          }),
        });

        if (!cartResponse.ok) {
          console.error('Failed to update cart');
        } else {
          dispatch(setCart(productItem, quantity));
        }
      } catch (error) {
        console.error('Failed to add product to cart:', error);
      }
    } else {
      dispatch(setCart(productItem, quantity));
    }
  };

  const handleFavorite = () => {
    if (token && userId) {
      dispatch(addToWishlist(userId, productItem._id));
    } else {
      if (isFavorite) {
        dispatch(removeWishlist(productItem._id));
      } else {
        dispatch(setWishlist(productItem));
      }
      setIsFavorite(!isFavorite);
    }
  };

  const handleQuantityChange = (e) => {
    const value = Number(e.target.value);
    
    if (value > 0) {
      setQuantity(value);
    } else {
      setQuantity(1); 
    }
  };

  return (
    <div className="relative bg-white p-4 h-80 border rounded-lg shadow-md">
      <img
        loading="lazy"
        onClick={handleClick}
        src={productItem.image}
        alt={productItem.Name || 'Product Image'}
        className="list_image object-cover cursor-pointer rounded-lg h-52"
      />
      <div
        className={`absolute top-4 right-6 cursor-pointer ${isFavorite ? 'text-red-600' : 'text-gray-600'}`}
        onClick={handleFavorite}
      >
        <Heart
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className={`${isFavorite ? 'fill-red-600' : ''}`}
        />
      </div>
      <div className="mt-auto">
        <h3
          className="text-xl font-semibold cursor-pointer hover:underline"
          onClick={handleClick}
        >
          {productItem.Name}
        </h3>
        <div className="mt-2 flex justify-between items-center">
          <h4 className="text-lg font-bold">${productItem.price}</h4>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="border rounded p-1 text-center"
              onKeyDown={(e) => e.key === '-' && e.preventDefault()} 
            />
            <button
              aria-label="Add to cart"
              type="button"
              className="px-3 py-2 bg-stone-300 rounded-full hover:bg-blue-600 hover:text-white hover:border-none flex items-center space-x-2"
              onClick={handleAdd}
            >
              <span>Add to Cart</span>
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
