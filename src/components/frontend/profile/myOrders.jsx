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
    <div className="container py-4 px-2 md:px-4 md:mt-6 mt-15 sm:mt-4">
      <h1 className="text-2xl bg-white py-2 font-bold text-center">My Orders</h1>
      <div className="mt-4">
        <div className="bg-white p-3 rounded-lg shadow-md overflow-x-auto">
          <table className="table-auto w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4">S.No</th>
                <th className="py-2 px-4">Order Id</th>
                <th className="py-2 px-4">Order Amount</th>
                <th className="py-2 px-4">Order Status</th>
                <th className="py-2 px-4">Created At</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {fetchedUserOrders.length > 0 ? (
                fetchedUserOrders.map((order, index) => (
                  <tr key={order._id} className="border-b">
                    <td className="py-2 px-4">{ ++index }</td>
                    <td className="py-2 px-4">{order._id}</td>
                    <td className="py-2 px-4">{order.orderTotalAmount}</td>
                    <td className="py-2 px-4">{order.orderStatus}</td>
                    <td className="py-2 px-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="py-2 px-4">
                      <button
                        className="flex items-center text-blue-500 hover:text-blue-700"
                        onClick={() => handleViewClick(order._id)}
                      >
                        <Eye size={20} /> <span className="ml-2">View</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">No orders found</td>
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
