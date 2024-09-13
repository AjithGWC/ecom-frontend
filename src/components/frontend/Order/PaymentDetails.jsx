import React, { useState } from 'react';

const PaymentDetails = () => {
  const [paymentMethod, setPaymentMethod] = useState('UPI');

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <div className="payment-details p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
      <form className='flex justify-around'>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="UPI"
              checked={paymentMethod === 'UPI'}
              onChange={handlePaymentChange}
              className="form-radio text-blue-600"
            />
            <span className="ml-2">UPI</span>
          </label>
        </div>

        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="Card"
              checked={paymentMethod === 'Card'}
              onChange={handlePaymentChange}
              className="form-radio text-blue-600"
            />
            <span className="ml-2">Card</span>
          </label>
        </div>

        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="COD"
              checked={paymentMethod === 'COD'}
              onChange={handlePaymentChange}
              className="form-radio text-blue-600"
            />
            <span className="ml-2">Cash on Delivery (COD)</span>
          </label>
        </div>
      </form>
    </div>
  );
};

export default PaymentDetails;
