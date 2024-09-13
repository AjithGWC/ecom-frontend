import React from "react";
import NavBar from "./Navbar/Navbar"
import { Outlet } from 'react-router-dom';
import HomeFooter from "./footer/footer";


const FrontendHome = () => {
    return (
        <div>
            <NavBar />
            <Outlet />
            <HomeFooter/>
        </div>
    );
}

export default FrontendHome;