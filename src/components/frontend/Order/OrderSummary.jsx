import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveOrder } from '../../../redux/actions/APIActions';
import Cookies from 'js-cookie';

const OrderSummary = () => {
  const fetchedCartProducts = useSelector((state) => state.apireducer.fetchedCartProducts) || [];
  const fetchCartByUserId = useSelector((state) => state.apireducer.fetchedCart) || [];

  const role = Cookies.get('role');
  console.log(role);
  
  const userId = Cookies.get('userId');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subtotal = fetchedCartProducts.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalQuantity = fetchedCartProducts.reduce((acc, item) => acc + item.quantity, 0);
  const shipping = totalQuantity * 100;
  const total = subtotal + shipping;

  const placeOrder = () => {
    dispatch(saveOrder(userId, fetchCartByUserId.products, shipping, total));
    navigate('/');
  };

  return (
    <div className="col-span-12 lg:col-span-4">
      <div className="order-summary p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <ul className="divide-y divide-gray-200 mb-4">
          {fetchedCartProducts.map((item) => (
            <li key={item.id} className="py-4 flex justify-between text-sm">
              <div>
                <p>{item.productName}</p>
                <p className="text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p>${item.price * item.quantity}</p>
            </li>
          ))}
        </ul>
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <p>Subtotal</p>
            <p>${subtotal}</p>
          </div>
          <div className="flex justify-between text-sm">
            <p>Shipping</p>
            <p>${shipping}</p>
          </div>
          <div className="flex justify-between text-lg font-semibold">
            <p>Total</p>
            <p>${total}</p>
          </div>
        </div>
        <button
          className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          onClick={placeOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
