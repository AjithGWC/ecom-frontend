import React, { useState } from "react";
import { ArrowLeft } from "react-feather";
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { createSeller } from "../../../redux/actions/backend/backendActions";
import { toast } from 'react-toastify';

const SellerAdd = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = Cookies.get('token');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        countryCode: '',
        phoneNumber: '',
        gender: '',
        district: '',
        state: '',
        country: '',
        address: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSelectChange = (selectedOption) => {
        setFormData(prevState => ({
            ...prevState,
            gender: selectedOption.value
        }));
    };

    const handleSave = async () => {
        dispatch(createSeller(token, formData));
        handleBack();
        setTimeout(() => {
            toast.success('Seller Created successfully!!', { autoClose: 5000 });
        }, 500);
    };

    const handleBack = () => {
        navigate('/backend/seller');
    };

    return (
        <div>
            <div className="box mt-5">
                <div className="flex flex-col lg:flex-row items-center p-5">
                    <button
                        className="btn btn-primary shadow-md mr-2"
                        onClick={handleBack}
                    >
                        <ArrowLeft size={16} />
                    </button>
                    <h1 className="text-lg font-bold" id="header-title">Add Seller</h1>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-5">
                <div className="grid1 grid-cols-2 gap-6 box mt-5">
                    <div className="intro-y p-5 grid grid-cols-2 gap-4">
                        <div className="w-full">
                            <label className="form-label">
                                First Name
                            </label><br />
                            <input
                                type="text"
                                name="firstName"
                                className="form-control w-full"
                                placeholder="Type First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="w-full">
                            <label className="form-label">
                                Last Name
                            </label><br />
                            <input
                                type="text"
                                name="lastName"
                                className="form-control w-full"
                                placeholder="Type Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="w-full">
                            <label className="form-label">
                                Email
                            </label><br />
                            <input
                                type="text"
                                name="email"
                                className="form-control w-full"
                                placeholder="Type Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="w-full">
                            <label className="form-label">
                                Password
                            </label><br />
                            <input
                                type="password"
                                name="password"
                                className="form-control w-full"
                                placeholder="Type Password"
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete="current-password"
                                required
                            />
                        </div>
                        <div className="w-full">
                            <label className="form-label">
                                Country Code
                            </label><br />
                            <input
                                type="text"
                                name="countryCode"
                                className="form-control w-full"
                                placeholder="Type Country Code"
                                value={formData.countryCode}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="w-full">
                            <label className="form-label">
                                Phone Number
                            </label><br />
                            <input
                                type="text"
                                name="phoneNumber"
                                className="form-control w-full"
                                placeholder="Type Phone Number"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="w-full">
                            <label className="form-label">
                                Gender
                            </label><br />
                            <Select
                                name="gender"
                                className="form-control w-full"
                                placeholder="Select Gender"
                                onChange={handleSelectChange}
                                options={[
                                    { value: 'male', label: 'Male' },
                                    { value: 'female', label: 'Female' }
                                ]}
                                required
                            />
                        </div>
                        {/* <div className="w-full">
                            <label htmlFor="image" className="form-label">
                                Image
                            </label><br />
                            <input
                                type="text"
                                name="image"
                                className="form-control w-full"
                                placeholder="Type Image URL"
                                value={formData.image}
                                onChange={handleChange}
                            />
                        </div> */}
                        <div className="w-full">
                            <label className="form-label">
                                District
                            </label><br />
                            <input
                                type="text"
                                name="district"
                                className="form-control w-full"
                                placeholder="Type District"
                                value={formData.district}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="w-full">
                            <label className="form-label">
                                State
                            </label><br />
                            <input
                                type="text"
                                name="state"
                                className="form-control w-full"
                                placeholder="Type State"
                                value={formData.state}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="w-full">
                            <label className="form-label">
                                Country
                            </label><br />
                            <input
                                type="text"
                                name="country"
                                className="form-control w-full"
                                placeholder="Type Country"
                                value={formData.country}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="w-full">
                            <label className="form-label">
                                Address
                            </label><br />
                            <textarea
                                name="address"
                                className="form-control w-full"
                                placeholder="Type Address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="text-right m-5">
                        <button
                            type="button"
                            className="btn btn-primary w-24"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerAdd;
