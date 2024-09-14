import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeCart, updateCartQuantity } from '../../../redux/actions/cartActions'; 
import { updateCartProductQuantity, removeCartProduct, fetchCartByUserId } from '../../../redux/actions/APIActions';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const fetchedCart = useSelector((state) => state.cart.products) || [];
  const fetchedCartProducts = useSelector((state) => state.apireducer.fetchedCartProducts) || [];

  const dispatch = useDispatch();
  const token = Cookies.get('token');
  const userId = Cookies.get('userId');

  useEffect(() => {
    if (token && userId) {
      setCartItems(fetchedCartProducts);
    } else {
      setCartItems(fetchedCart);
    }
  }, [fetchedCartProducts, fetchedCart, token, userId]);

  useEffect(() => {
    const { totalPrice, totalQuantity } = cartItems.reduce(
      (totals, item) => {
        const product = item.product || item;
        const quantity = parseInt(item.quantity, 10) || 0;
        const price = parseFloat(product.price) || 0;

        totals.totalPrice += price * quantity;
        totals.totalQuantity += quantity;
        return totals;
      },
      { totalPrice: 0, totalQuantity: 0 }
    );
    setTotalPrice(totalPrice);
    setTotalQuantity(totalQuantity);
  }, [cartItems]);

  const handleRemove = (product) => {
    const productId = token && userId ? product.productId : product._id;
    if (token && userId) {
      dispatch(removeCartProduct(userId, productId))
      .then(() => {
        dispatch(fetchCartByUserId(userId))
      })
      .catch((error) => {
        console.error('Failed to add product to wishlist:', error);
      }); 
    } else {
      dispatch(removeCart(productId));
    }
  };

  const handleQuantityChange = (product, newQuantity) => {
    const productId = token && userId ? product.productId : product._id;
    if (newQuantity > 0) {
      if (token && userId) {        
        dispatch(updateCartProductQuantity(userId, productId, newQuantity))
        .then(() => {
          dispatch(fetchCartByUserId(userId))
        })
        .catch((error) => {
          console.error('Failed to add product to wishlist:', error);
        }); 
      } else {
        dispatch(updateCartQuantity(productId, newQuantity));
      }
    }
  };

  const handleCheckout = () => {
    if (token && userId) {
      navigate('/checkout');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className='bg-primary'>
      <div className="p-2">
        <div className=''>
          <h1 className="text-2xl font-bold mb-4 bg-white p-3 mt-4">Your Cart</h1>
          <div className='grid grid-cols-12 gap-4'>
            <div className={cartItems.length === 0 ? 'col-span-12' : 'col-span-8'}>
              {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <ul className="space-y-4">
                  {cartItems.map((item) => {
                    const product = item.product || item; 
                    return (
                      <div className='m-4 px-4 py-6 rounded-lg bg-white' key={product._id}>
                        <li className="flex items-center border-b py-4">
                          <img
                            src={product.image}
                            alt={product.Name}
                            className="w-24 h-24 object-cover rounded"
                          />
                          <div className="ml-4 flex-1">
                            <h2 className="text-lg font-semibold">{product.Name}</h2>
                            <p className="text-gray-600">Price: ${parseFloat(product.price).toFixed(2)}</p>
                            <div className="flex items-center space-x-2">
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(product, Number(e.target.value))}
                                className="border rounded p-1 text-center w-16"
                              />
                            </div>
                          </div>
                          <button
                            className="ml-4 text-red-500 hover:text-red-700"
                            onClick={() => handleRemove(product)}
                          >
                            Remove
                          </button>
                        </li>
                      </div>
                    );
                  })}
                </ul>
              )}
            </div>
            {cartItems.length > 0 && (
              <div className='col-span-4 mt-4'>
                <div className="p-4 bg-white rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
                  <p className="text-lg">Total Items: {totalQuantity}</p>
                  <p className="text-lg">Total Price: ${totalPrice.toFixed(2)}</p>
                  <button
                    onClick={handleCheckout}
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-4 block text-center hover:bg-blue-600"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-6 mx-4 flex justify-between">
            <Link
              to="/shop"
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
