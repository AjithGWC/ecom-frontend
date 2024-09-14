import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCart } from "../../../redux/actions/cartActions";
import Cookies from 'js-cookie';
import "./productView.css";

const ProductView = ({ product, category }) => {
  const dispatch = useDispatch();
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [quantity, setQuantity] = useState(1); 

  useEffect(() => {
    const storedToken = Cookies.get('token');
    const storedUserId = Cookies.get('userId');

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedUserId) {      
      setUserId(storedUserId);
    }
  }, [token, userId]);

  const handleQuantityChange = (e) => {
    const value = Number(e.target.value);
    console.log(value);
    
    if (value > 0) {
      setQuantity(value);
    } else {
      setQuantity(1); 
    }
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
            productId: product._id, 
            quantity: quantity
          }),
        });

        if (!cartResponse.ok) {
          console.error('Failed to update cart');
        } else {
          dispatch(setCart(product, quantity));
        }
      } catch (error) {
        console.error('Failed to add product to cart:', error);
      }
    } else {
      dispatch(setCart(product, quantity));  
    }
  };

  return (
    <section className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex md:flex-row justify-center items-start space-y-8 md:space-y-0 md:space-x-8">
          <div className="w-full md:w-1/2">
            <img
              loading="lazy"
              src={product?.image}
              alt={product?.productName || "product Image"}
              className="h-60 object-cover mx-auto rounded-lg shadow-md"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">{product?.Name}</h2>
            
            <div className="flex flex-col space-y-2">
              <span className="text-xl font-semibold text-gray-800">${product?.price}</span>
              <span className="text-gray-600">Category: {category?.Name}</span>
            </div>
            <p className="text-gray-700">{product?.description}</p>

            <input
              className="w-1/4 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              onKeyDown={(e) => e.key === '-' && e.preventDefault()} 
            />

            <button
              aria-label="Add to Cart"
              type="button"
              className="w-1/5 add-cart text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={handleAdd}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductView;
