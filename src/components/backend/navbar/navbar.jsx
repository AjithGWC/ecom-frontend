import React, { useEffect } from "react";
import { NavLink, useLocation, useNavigate  } from "react-router-dom";
import { Grid, Archive, Users } from "react-feather";
import Cookies from 'js-cookie';
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
    
    return (
        <nav className="side-nav">
            <a href="/" className="intro-x flex items-center pl-5 pt-4">
                <span className="hidden xl:block text-white text-lg ml-3">
                    Admin Panel
                </span>
            </a>
            <ul className="fd-c">
                <li className="p-0 mt-6 ml-0" id="nav-home">
                    <NavLink to=""  className={`side-menu ${(location.pathname === '/backend/product' || location.pathname === '/backend/add-product' || location.pathname.includes('/backend/edit-product')) ? 'side-menu--active' : 'text-black'}`}  >
                        <div className="side-menu__icon">
                            <Grid size={16} />
                        </div>
                        <div className="side-menu__title">Product</div>
                    </NavLink>
                </li>
                <li className="p-0 ml-0" id="nav-leads">
                    <NavLink to="/backend/category" className={`side-menu ${(location.pathname === '/backend/category' || location.pathname === '/backend/add-category' || location.pathname.includes('/backend/edit-category')) ? 'side-menu--active' : 'text-black'}`}>
                        <div className="side-menu__icon">
                            <Archive size={16} />
                        </div>
                        <div className="side-menu__title">Category</div>
                    </NavLink>
                </li>
                <li className="p-0 ml-0" id="nav-leads">
                    <NavLink to="/backend/seller" className={`side-menu ${(location.pathname === '/backend/seller' || location.pathname === '/backend/add-seller' || location.pathname.includes('/backend/edit-seller')) ? 'side-menu--active' : 'text-black'}`}>
                        <div className="side-menu__icon">
                            <Users size={16} />
                        </div>
                        <div className="side-menu__title">Seller</div>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default BackendNavbar;
