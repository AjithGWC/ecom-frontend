import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSeller, fetchUserById, deleteSeller } from '../../../redux/actions/backend/backendActions';
import { Trash2, Edit } from "react-feather";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SellerList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); 
    const token = Cookies.get('token');
    const sellers = useSelector(state => state.backend.seller); 
    const sellerDetails = useSelector(state => state.backend.user); 

    useEffect(() => {
        if (sellers.length > 0) {
            sellers.forEach(seller => {
                dispatch(fetchUserById(token, seller.userId)); 
            });
        }
    }, [sellers, dispatch, token]);

    useEffect(() => {
        dispatch(fetchSeller(token));
    }, [dispatch, token]);

    useEffect(() => {
        if (sellerDetails) {
            setData(sellerDetails);
        } else {
            console.error('Unexpected response format:', sellerDetails);
            setData([]);
        }
    }, [sellerDetails]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleAddProduct = () => {
        navigate('/backend/add-seller');
    };

    const handleEditClick = (id) => {
        navigate(`/backend/edit-seller/${id}`);
    };

    const handleDeleteClick = (id) => {
        dispatch(deleteSeller(token, id));
        navigate('/backend/seller');
    };

    return (
        <div>
            <div className="box mt-5">
                <div className="flex flex-col lg:flex-row items-center p-5">
                    <h1 className="text-lg font-bold" id="header-title">Sellers</h1>
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
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Gender</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => (
                            <tr key={item._id}>
                                <td>{ indexOfFirstItem + index + 1 }</td>
                                <td>{item.firstName + " " + item.lastName}</td>
                                <td>{item.email}</td>
                                <td>{item.phoneNumber}</td>
                                <td>{item.gender}</td>
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
                {totalPages > 1 && (
                    <div className="flex justify-center mt-4 space-x-2">
                        <button 
                            className={`btn ${currentPage === 1 ? 'btn-secondary disabled' : 'btn-primary'}`} 
                            onClick={() => handlePageChange(currentPage - 1)}
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
                            onClick={() => handlePageChange(currentPage + 1)}
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

export default SellerList;
