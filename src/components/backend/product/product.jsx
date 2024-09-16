import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../redux/actions/APIActions'; 
import { deleteProduct } from "../../../redux/actions/backend/backendActions";
import { Trash2, Edit } from "react-feather";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductList = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); 
    const navigate = useNavigate();
    const products = useSelector(state => state.apireducer.fetchedProducts); 

    const token = Cookies.get('token');

    useEffect(() => {
        dispatch(fetchProducts(token));
    }, [dispatch, token]);

    useEffect(() => {
        if (products) {
            setData(products);
        } else {
            console.error('Unexpected response format:', products);
            setData([]);
        }
    }, [products]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <div className="box mt-5">
                <div className="flex flex-col lg:flex-row items-center p-5">
                    <h1 className="text-lg font-bold" id="header-title">Products</h1>
                    <button 
                        className='ml-auto mr-3 btn btn-primary w-24 mr-1 mb-2' 
                        onClick={() => navigate('/backend/add-product')}
                    >
                        Add +
                    </button>
                </div>
            </div>
            <div className='box mt-5 p-3 overflow-x-auto'>
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <th>s.No</th>
                            <th>Name</th>
                            <th>Category ID</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => (
                            <tr key={item._id}>
                                <td>{indexOfFirstItem + index + 1}</td>
                                <td>{item.Name}</td>
                                <td>{item.categoryId}</td>
                                <td>{item.description}</td>
                                <td>{item.price}</td>
                                <td><img src={item.image} alt={item.name} className="h-10 w-10 object-cover" /></td>
                                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <div className='flex justify-around'>
                                        <button className='flex btn-orange' onClick={() => navigate(`/backend/edit-product/${item._id}`)}>
                                            <Edit size={20} color='orange' /> Edit
                                        </button>
                                    </div>
                                    <div className='flex justify-around mt-2'>
                                        <button className='flex btn-delete' onClick={() => dispatch(deleteProduct(token, item._id))}>
                                            <Trash2 size={20} color='red' /> Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {totalPages > 1 && (
                    <div className="flex justify-center mt-4 space-x-2">
                        <button 
                            className={`btn ${currentPage === 1 ? 'btn-secondary disabled' : 'btn-primary'}`} 
                            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button 
                                key={index + 1}
                                className={`btn ${currentPage === index + 1 ? 'btn-primary' : 'btn-secondary'}`} 
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button 
                            className={`btn ${currentPage === totalPages ? 'btn-secondary disabled' : 'btn-primary'}`} 
                            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default ProductList;
