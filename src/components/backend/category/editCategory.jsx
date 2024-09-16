import React, { useState, useEffect } from "react";
import { ArrowLeft } from "react-feather";
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategoriesById } from "../../../redux/actions/APIActions";
import { updateCategory } from "../../../redux/actions/backend/backendActions";
import { toast } from 'react-toastify';

const CategoryEdit = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const token = Cookies.get('token');
    const [formData, setFormData] = useState({
        Name: '',
        description: '',
        image: ''
    });

    const category = useSelector(state => state.apireducer.fetchedCategoryById); 
    console.log(category);
    
    const handleBack = () => {
        navigate('/backend/category');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        dispatch(fetchCategoriesById(id));
    }, []);

    const handleSave = async () => {
        try {
            dispatch(updateCategory(token, id, formData));
            navigate('/backend/category');
            setTimeout(() => {
                toast.success('category Updated successfully!!', { autoClose: 5000 });
            }, 500);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    useEffect(() => {
        if (category) {
            setFormData({
                Name: category.Name || '',
                description: category.description || '',
                image: category.image || ''
            });
        }
    }, [category]);

    return(
        <div>
            <div className="box mt-5">
                <div className="flex flex-col lg:flex-row items-center p-5">
                    <button
                        className="btn btn-primary shadow-md mr-2"
                        onClick={handleBack}
                    >
                        <ArrowLeft size={16} />
                    </button>
                    <h1 className="text-lg font-bold" id="header-title">Edit Category</h1>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-5">
                <div className="grid1 grid-cols-2 gap-6 box mt-5">
                    <div className="intro-y p-5 grid grid-cols-2 gap-4">
                        <div className="w-full">
                            <label htmlFor="crud-form-1" className="form-label">
                                Category Name
                            </label><br />
                            <input
                                type="text"
                                name="Name"
                                className="form-control w-full"
                                placeholder="Type Category Name"
                                value={formData.Name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="crud-form-1" className="form-label">
                                Product Image
                            </label><br />
                            <input
                                type="text"
                                name="image"
                                className="form-control w-full"
                                placeholder="Type Image Name"
                                value={formData.image}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="crud-form-3" className="form-label">
                                Category Description
                            </label><br />
                            <textarea
                                name="description"
                                className="form-control w-full"
                                placeholder="Type Category Description"
                                value={formData.description}
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

export default CategoryEdit;