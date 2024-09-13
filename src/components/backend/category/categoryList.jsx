import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../../redux/actions/APIActions'; 
import { deleteCategory } from "../../../redux/actions/backend/backendActions";
import { Trash2, Edit } from "react-feather";

const CategoryList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const token = Cookies.get('token');
    const categories = useSelector(state => state.apireducer.fetchedCategories); 
    
    useEffect(() => {
        dispatch(fetchCategories(token));
    }, [dispatch]);

    useEffect(() => {
        if (categories) {
            setData(categories);            
        } else {
            console.error('Unexpected response format:', categories);
            setData([]);
        }
            
    }, [categories]);

    const handleAddCategory = () => {
        navigate('/backend/add-category');
    };

    const handleEditClick = (id) => {
        navigate(`/backend/edit-category/${id}`);
    };

    const handleDeleteClick = (id) => {
        dispatch(deleteCategory(token, id));
        navigate('/backend/category');
    };

    return(
        <div>
            <div className="box mt-5">
                <div className="flex flex-col lg:flex-row items-center p-5">
                    <h1 className="text-lg font-bold" id="header-title">Category</h1>
                    <button 
                        className='ml-auto mr-3 btn btn-primary w-24 mr-1 mb-2' 
                        onClick={handleAddCategory}
                    >
                        Add +
                    </button>
                </div>
            </div>
            <div className='box mt-5 p-3'>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>s.No</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item._id}>
                                <td>{ ++index }</td>
                                <td>{item.Name}</td>
                                <td>{item.description}</td>
                                <td><img src={item.image} alt={item.name} className="h-10 w-10 object-cover" /></td>
                                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <div className='flex justify-around'>
                                        <button className='flex btn-orange' onClick={() => handleEditClick(item._id)}>
                                            <Edit size={20} color='orange' /> Edit
                                        </button>
                                    </div>
                                    <div className='flex justify-around mt-2'>
                                        <button className='flex btn-delete' onClick={() => handleDeleteClick(item._id)}>
                                            <Trash2 size={20} color='red' /> Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CategoryList;