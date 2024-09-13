import React from "react";
import ShippingInfo from "../Order/shippingInfo";
import PaymentDetails from "../Order/PaymentDetails";
import OrderSummary from "../Order/OrderSummary";
import { useSelector } from 'react-redux';

const Checkout = () => {
    const fetchedCart = useSelector((state) => state.apireducer.fetchedCart) || [];
    
    return (
        <div className="bg-primary place-order-page container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-8 bg-white p-3 mt-4">Place Your Order</h1>
            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-8">
                    <ShippingInfo />
                    <PaymentDetails />
                </div>
                <OrderSummary />
            </div>
        </div>
    );
};

export default Checkout;