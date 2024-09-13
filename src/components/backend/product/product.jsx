import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../redux/actions/APIActions'; 
import { deleteProduct } from "../../../redux/actions/backend/backendActions";
import { Trash2, Edit } from "react-feather";

const ProductList = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const products = useSelector(state => state.apireducer.fetchedProducts); 

    const token = Cookies.get('token');

    useEffect(() => {
        dispatch(fetchProducts(token));
    }, [dispatch]);

    useEffect(() => {
        if (products) {
            setData(products);
            console.log(data);
            
        } else {
            console.error('Unexpected response format:', products);
            setData([]);
        }
            
    }, [products]);

    const handleAddProduct = () => {
        navigate('/backend/add-product');
    };

    const handleEditClick = (id) => {
        navigate(`/backend/edit-product/${id}`);
    };

    const handleDeleteClick = (id) => {
        dispatch(deleteProduct(token, id));
        navigate('/backend/product');
    };

    return (
        <div>
            <div className="box mt-5">
                <div className="flex flex-col lg:flex-row items-center p-5">
                    <h1 className="text-lg font-bold" id="header-title">Products</h1>
                    <button 
                        className='ml-auto mr-3 btn btn-primary w-24 mr-1 mb-2' 
                        onClick={handleAddProduct}
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
                            <th>Category ID</th>
                            <th>Description</th>
                            <th>Price</th>
                            {/* <th>Currency</th>
                            <th>Quantity</th>
                            <th>Selled Quantity</th> */}
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
                                <td>{item.categoryId}</td>
                                <td>{item.description}</td>
                                <td>{item.price}</td>
                                {/* <td>{item.currency}</td>
                                <td>{item.quantity}</td>
                                <td>{item.selledQuantity}</td> */}
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

export default ProductList;
