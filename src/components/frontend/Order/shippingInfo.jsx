import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserById } from '../../../redux/actions/APIActions';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

const ShippingInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchedUserDetails = useSelector((state) => state.apireducer.fetchUserById) || [];

  const token = Cookies.get('token');
  const userId = Cookies.get('userId');

  useEffect(() => {
    if (token && userId && (!fetchedUserDetails || !fetchedUserDetails._id)) {
      dispatch(fetchUserById(userId));
    }
  }, [token, userId, dispatch]); 

  const handleProfile = () => {
    navigate(`/profile/${userId}`);
  };

  const address = fetchedUserDetails?.address || '';
  const city = fetchedUserDetails?.district || '';
  const countryCode = fetchedUserDetails?.countryCode || '';
  const country = fetchedUserDetails?.country || '';
  const phoneNumber = fetchedUserDetails?.phoneNumber || '';

  return (
    <div className="shipping-info mb-8 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Billing Information</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input 
            type="text" 
            value={address} 
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md"  
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">City</label>
          <input 
            type="text" 
            value={city} 
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md" 
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Country Code</label>
          <input 
            type="text" 
            value={countryCode} 
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md" 
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input 
            type="text" 
            value={phoneNumber} 
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md" 
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Country</label>
          <input 
            type="text" 
            value={country} 
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md" 
          />
        </div>
      </form>
      <div className="mt-6 flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
        <h3 className="text-lg font-medium text-gray-700">Need to update your address?</h3>
        <button
          className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md"
          onClick={handleProfile}
        >
          Change Address
        </button>
      </div>
    </div>
  );
};

export default ShippingInfo;
