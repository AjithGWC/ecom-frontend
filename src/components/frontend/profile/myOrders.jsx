import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getOrderByUserId } from "../../../redux/actions/APIActions";
import Cookies from "js-cookie";
import { Eye } from 'react-feather'; 

const MyOrders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const userId = Cookies.get("userId");
  const ordersFromStore = useSelector((state) => state.apireducer.fetchedUserOrders) || [];
  const [fetchedUserOrders, setFetchedUserOrders] = useState([]);
  console.log(fetchedUserOrders);
  
  useEffect(() => {
    if (token && userId && (!fetchedUserOrders || fetchedUserOrders.length === 0)) {
      dispatch(getOrderByUserId(userId));
    }
  }, [dispatch, userId, fetchedUserOrders]);

  useEffect(() => {
    if(ordersFromStore){
      setFetchedUserOrders(ordersFromStore);
    }
  }, [useSelector((state) => state.apireducer.fetchedUserOrders)]);

  const handleViewClick = (orderId) => {
    navigate(`/profile/${userId}/orders/${orderId}`);
  };

  return (
    <div className="container py-4">
      <h1 className="text-2xl bg-white py-2 font-bold text-center">My Orders</h1>
      <div className="mt-4">
        <div className="bg-white p-3">
          <table className="table table-bordered w-full">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Order Id</th>
                <th>Order Amount</th>
                <th>Order Status</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {fetchedUserOrders.length > 0 ? (
                fetchedUserOrders.map((order, index) => (
                  <tr key={order._id}>
                    <td>{ ++index }</td>
                    <td>{order._id}</td>
                    <td>{order.orderTotalAmount}</td>
                    <td>{order.orderStatus}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div className='flex justify-around'>
                        <button className='flex btn-orange' onClick={() => handleViewClick(order._id)}>
                          <Eye size={20} color='blue' /> View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">No orders found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
