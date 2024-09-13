import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderByOrderId } from "../../../redux/actions/APIActions";

const OrderView = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const ordersByOrderId = useSelector((state) => state.apireducer.fetchedOrdersByOrderId) || [];
console.log(ordersByOrderId);

    useEffect(() => {
        if (!ordersByOrderId || ordersByOrderId.length === 0) {
            dispatch(getOrderByOrderId(id));
        }
    }, [dispatch, id, ordersByOrderId]);

    return (
        <div>
            <div className="grid grid-cols-3 gap-4 flex">
                {ordersByOrderId.length > 0 ? (
                    ordersByOrderId.map((order, index) => (
                        <div key={index} className="p-4 rounded bg-white h-80">
                            <h2 className="font-bold text-xl">{order.Name}</h2>
                            <p>{order.description}</p>
                            <img src={order.image} alt={order.Name} className="list_image object-cover cursor-pointer h-52" />
                            <h1 className="text-center mt-4">QTY: {order.quantity}</h1>
                        </div>
                    ))
                ) : (
                    <h1 className="text-center">No orders found</h1>
                )}
            </div>
        </div>
    );
};

export default OrderView;
