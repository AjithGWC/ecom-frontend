import React, { useState, useEffect } from "react";
import { ArrowLeft } from "react-feather";
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { createProduct } from "../../../redux/actions/backend/backendActions";
import axios from 'axios';
import '../../../dist/css/app.css';

const getAuthToken = () => {
    return Cookies.get('token');
};

const ProductAdd = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = Cookies.get('userId');
    const [formData, setFormData] = useState({
        Name: '',
        categoryId: '',
        description: '',
        image: '',
        sellerId: '',
        currency: '',
        price: '',
        quantity: ''
    });
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [sellerOptions, setSellerOptions] = useState([]);
    const [CountryOptions, setCountryOptions] = useState([]);

    useEffect(() => {
        const token = getAuthToken();

        const fetchCategoryOptions = async () => {
            try {
                const response = await axios.get('https://ecommerce-backend-mdiu.onrender.com/admin/category/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const options = response.data.map(category => ({
                    value: category._id,
                    label: category.Name
                }));
                setCategoryOptions(options);
            } catch (error) {
                console.error('Error fetching category options:', error);
            }
        };

        const fetchSellerOptions = async () => {
            try {
                const response = await axios.get('https://ecommerce-backend-mdiu.onrender.com/admin/users/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const options = response.data
                    .filter(user => user.role === 'seller')
                    .map(user => ({
                        value: user._id,
                        label: user.firstName
                    }));

                setSellerOptions(options);
            } catch (error) {
                console.error('Error fetching seller options:', error);
            }
        };

        const fetchCountryOptions = async () => {
            try {
                const response = await axios.get('https://ecommerce-backend-mdiu.onrender.com/admin/country/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const options = response.data.map(country => ({
                    value: country._id,
                    label: `${country.currencySymbol} (${country.currencyName})`
                }));
                setCountryOptions(options);
            } catch (error) {
                console.error('Error fetching country options:', error);
            }
        };

        fetchCategoryOptions();
        fetchSellerOptions();
        fetchCountryOptions();
    }, []);

    const handleBack = () => {
        navigate('/backend/product');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSelectChange = (selectedOption, { name }) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: selectedOption ? selectedOption.value : ''
        }));
    };

    const handleSave = async () => {
        try {
            const token = getAuthToken();
        
            console.log(formData);
            
        
            dispatch(createProduct(token, formData));
            navigate('/backend/product');
        } catch (error) {
            console.error('Error adding product:', error);
        }
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
                    <h1 className="text-lg font-bold" id="header-title">Add Product</h1>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-5">
                <div className="grid1 grid-cols-2 gap-6 box mt-5">
                    <div className="intro-y p-5 grid grid-cols-2 gap-4">
                        <div className="w-full">
                            <label htmlFor="crud-form-1" className="form-label">
                                Product Name
                            </label><br />
                            <input
                                type="text"
                                name="Name"
                                className="form-control w-full"
                                placeholder="Type Product Name"
                                value={formData.Name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="crud-form-2" className="form-label">
                                Product Category
                            </label><br />
                            <Select
                                name="categoryId"
                                className="form-control w-full"
                                placeholder="Select Category"
                                options={categoryOptions}
                                onChange={handleSelectChange}
                                isSearchable={true}
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="crud-form-3" className="form-label">
                                Product Description
                            </label><br />
                            <textarea
                                name="description"
                                className="form-control w-full"
                                placeholder="Type Product Description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="crud-form-4" className="form-label">
                                Product Image URL
                            </label><br />
                            <input
                                type="text"
                                name="image"
                                className="form-control w-full"
                                placeholder="Type Image URL"
                                value={formData.image}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="w-full">
                            <label htmlFor="crud-form-5" className="form-label">
                                Product Seller
                            </label><br />
                            <Select
                                name="sellerId"
                                className="form-control w-full"
                                placeholder="Select Seller"
                                options={sellerOptions}
                                onChange={handleSelectChange}
                                isSearchable={true}
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="crud-form-6" className="form-label">
                                Currency
                            </label><br />
                            <Select
                                name="currency"
                                className="form-control w-full"
                                placeholder="Select Currency"
                                options={CountryOptions}
                                onChange={handleSelectChange}
                                isSearchable={true}
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="crud-form-7" className="form-label">
                                Price
                            </label><br />
                            <input
                                type="number"
                                name="price"
                                className="form-control w-full"
                                placeholder="Type Product Price"
                                value={formData.price}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="crud-form-8" className="form-label">
                                Quantity
                            </label><br />
                            <input
                                type="number"
                                name="quantity"
                                className="form-control w-full"
                                placeholder="Type Product Quantity"
                                value={formData.quantity}
                                onChange={handleChange}
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

export default ProductAdd;