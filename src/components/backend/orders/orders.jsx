import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getOrders } from '../../../redux/actions/APIActions';
import { Eye } from 'react-feather';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const fetchedOrders = useSelector(state => state.apireducer.fetchedOrders); 

    useEffect(() => {
        if(!fetchedOrders || fetchedOrders == ""){
            dispatch(getOrders());
        }
    }, [dispatch, fetchedOrders]);

    const handleOrderView = (id) => {
        navigate(`/backend/order-view/${id}`);
    };
    
    return (
        <div>
            <div className="box mt-5">
                <div className="flex flex-col lg:flex-row items-center p-5">
                    <h1 className="text-lg font-bold" id="header-title">Orders</h1>
                </div>
            </div>
            <div className='box mt-5 p-3'>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                        <th className="py-2 px-4">S.No</th>
                        <th className="py-2 px-4">Order Id</th>
                        <th className="py-2 px-4">Order Amount</th>
                        <th className="py-2 px-4">Order Status</th>
                        <th className="py-2 px-4">Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fetchedOrders.map((item, index) => (
                            <tr key={item._id}>
                                <td>{ index + 1 }</td>
                                <td className="py-2 px-4">{item._id}</td>
                                <td className="py-2 px-4">{item.orderTotalAmount}</td>
                                <td className="py-2 px-4">{item.orderStatus}</td>
                                <td className="py-2 px-4">{new Date(item.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <div className='flex justify-around'>
                                        <button className='flex btn-orange' onClick={() => handleOrderView(item._id)}>
                                            <Eye size={20} color='blue' /> View
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </div>
    );
};

export default OrderList;