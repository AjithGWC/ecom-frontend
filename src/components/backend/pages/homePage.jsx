import React from "react";
import BackendNavbar from "../navbar/navbar";
import { Outlet } from 'react-router-dom';

const BackendHome = () => {
    return (
        <div className="py-5 px-2">
            <div className="flex">
                <BackendNavbar />
                <div className="content">
                    <Outlet />
                </div>
                
            </div>
        </div>
    );
}

export default BackendHome;
