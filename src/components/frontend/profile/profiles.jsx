import React, { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Edit2, X } from "react-feather";
import { fetchUserById } from "../../../redux/actions/APIActions";
import { updateUserById } from "../../../redux/actions/backend/backendActions";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";

const Profile = () => {
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const userId = Cookies.get("userId");
  const fetchedUserDetails = useSelector((state) => state.apireducer.fetchUserById) || [];

  const [isModalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    district: "",
    state: "",
    country: "",
    countryCode: "",
    gender: "",
  });

  useEffect(() => {
    if (userId && (!fetchedUserDetails || !fetchedUserDetails._id)) {
      dispatch(fetchUserById(userId));
    } else {
      setFormData({
        firstName: fetchedUserDetails.firstName || "",
        lastName: fetchedUserDetails.lastName || "",
        email: fetchedUserDetails.email || "",
        phoneNumber: fetchedUserDetails.phoneNumber || "",
        address: fetchedUserDetails.address || "",
        district: fetchedUserDetails.district || "",
        state: fetchedUserDetails.state || "",
        country: fetchedUserDetails.country || "",
        countryCode: fetchedUserDetails.countryCode || "",
        gender: fetchedUserDetails.gender || "",
      });
    }
  }, [userId, dispatch, fetchedUserDetails]);

  const handleEditProfile = () => {
    setModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setModalOpen(false);
    dispatch(updateUserById(token, fetchedUserDetails._id, formData)); 
    dispatch(fetchUserById(userId));
  };

  return (
    <div className="container">
      <div className="mx-8r bg-white rounded-lg p-4 text-center">
        <div className="relative pr-4">
          <h1 className="text-2xl font-bold w-full text-center">My Profile</h1>
          <div className="relative inline-block">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              className="bg-gray-600 mt-7 w-48 mx-auto border-img"
            />
            <button
              onClick={handleEditProfile}
              className="absolute top-2 right-2 bg-gray-600 text-white p-2 rounded-full hover:bg-blue-700 transition-all"
              title="Edit Profile"
            >
              <Edit2 size={16} />
            </button>
          </div>
          <h1 className="text-xl mt-8 mb-4">{fetchedUserDetails.firstName + " " + fetchedUserDetails.lastName}</h1>
        </div>
      </div>
      <div className="mt-2">
        <div className="grid grid-cols-2 flex gap-4 p-5">
          <div className="p-3 rounded-lg bg-white">
            <div>
              <h1 className="text-lg text-center font-semibold">User Contact Information</h1>
              <div>
                <h1 className="text-md font-medium m-3 pl-4 flex items-center">
                  <Mail className="mr-2" /> Email: <span className="ml-2 font-semibold">{fetchedUserDetails.email}</span>
                </h1>
                <h1 className="text-md font-medium m-3 pl-4 flex items-center">
                  <Phone className="mr-2" /> Phone-No:{" "}
                  <span className="ml-2 font-semibold">{fetchedUserDetails.countryCode + " " + fetchedUserDetails.phoneNumber}</span>
                </h1>
              </div>
            </div>
          </div>
          <div className="p-3 rounded-lg bg-white">
            <div>
              <h1 className="text-lg text-center font-semibold">User Address Information</h1>
              <div>
                <h1 className="text-md font-medium m-3 pl-4 flex items-center pt-4">
                  <MapPin className="mr-2" /> Address:{" "}
                  <span className="ml-2 font-semibold">{fetchedUserDetails.address}</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg model-width relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-left font-medium">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-left font-medium">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                  />
                </div>
              </div>
        
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-left font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-left font-medium">Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                  />
                </div>
              </div>
        
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-left font-medium">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-left font-medium">District</label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                  />
                </div>
              </div>
        
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-left font-medium">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-left font-medium">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                  />
                </div>
              </div>
        
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-left font-medium">Country Code</label>
                  <input
                    type="text"
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-left font-medium">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
        
              <div className="text-center">
                <button type="submit" className="bg-blue-600 text-white px-8 mt-4 py-2 rounded hover:bg-blue-700">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      
      )}
    </div>
  );
};

export default Profile;