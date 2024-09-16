import React, { useEffect } from "react";
import { NavLink, useLocation, useNavigate  } from "react-router-dom";
import { Grid, Archive, Users, Truck, User } from "react-feather";
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import '../../../dist/css/app.css';

const BackendNavbar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');
        if (!token) {
            navigate("/backend/login", { replace: true }); 
        }
    }, [navigate]);

    const handleLogout = () => {
        Cookies.remove('token', { path: '/' });
        Cookies.remove('role', { path: '/' });
        Cookies.remove('userId', { path: '/' });
        navigate('/backend/login');
        setTimeout(() => {
          toast.success('Logged-out successful!', { autoClose: 5000 });
        }, 500);
    };
    
    return (
        <nav className="side-nav">
            <a className="intro-x flex items-center pl-5 pt-4">
                <span className="hidden xl:block text-white text-lg ml-3">
                    Admin Panel
                </span>
            </a>
            <ul className="h-90">
                <li className="p-0 mt-6 ml-0" id="nav-home">
                    <NavLink to=""  className={`side-menu ${(location.pathname === '/backend/product' || location.pathname === '/backend/add-product' || location.pathname.includes('/backend/edit-product')) ? 'side-menu--active' : 'text-black'}`}  >
                        <div className="side-menu__icon">
                            <Grid size={16} />
                        </div>
                        <div className="side-menu__title">Products</div>
                    </NavLink>
                </li>
                <li className="p-0 ml-0" id="nav-leads">
                    <NavLink to="/backend/category" className={`side-menu ${(location.pathname === '/backend/category' || location.pathname === '/backend/add-category' || location.pathname.includes('/backend/edit-category')) ? 'side-menu--active' : 'text-black'}`}>
                        <div className="side-menu__icon">
                            <Archive size={16} />
                        </div>
                        <div className="side-menu__title">Categories</div>
                    </NavLink>
                </li>
                <li className="p-0 ml-0" id="nav-leads">
                    <NavLink to="/backend/seller" className={`side-menu ${(location.pathname === '/backend/seller' || location.pathname === '/backend/add-seller' || location.pathname.includes('/backend/edit-seller')) ? 'side-menu--active' : 'text-black'}`}>
                        <div className="side-menu__icon">
                            <Users size={16} />
                        </div>
                        <div className="side-menu__title">Sellers</div>
                    </NavLink>
                </li>
                <li className="p-0 ml-0" id="nav-leads">
                    <NavLink to="/backend/order" className={`side-menu ${(location.pathname === '/backend/order' || location.pathname.includes('/backend/order-view')) ? 'side-menu--active' : 'text-black'}`}>
                        <div className="side-menu__icon">
                            <Truck size={16} />
                        </div>
                        <div className="side-menu__title">Orders</div>
                    </NavLink>
                </li>
            </ul>
            <div className="mt-auto p-5">
            <button 
                className="side-menu text-black flex items-center" 
                onClick={handleLogout}
            >
                <div className="side-menu__icon">
                    <User size={16} />
                </div>
                <div className="side-menu__title">Logout</div>
            </button>
            </div>
        </nav>
    );
};

export default BackendNavbar;
