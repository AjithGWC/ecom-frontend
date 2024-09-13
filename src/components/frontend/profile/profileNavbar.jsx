import React from "react";
import { Link, useLocation } from "react-router-dom";

const ProfileNavbar = () => {
  const location = useLocation();
  return (
    <nav className="p-4">
      <div className="container mx-auto">
        <ul className="space-x-4 text-white">
          <li className="p-3 ml-5">
            <Link to="" className={`${location.pathname.includes("/profile") && !location.pathname.includes("/orders") ? 'bg-white p-2 rounded-xl block text-center w-28 text-black' : 'text-white'}`}>Overview</Link>
          </li>
          <li className="p-3">
            <Link to="orders" className={`${location.pathname.includes('/orders') ? 'bg-white p-2 rounded-xl block text-center w-28 text-black' : 'text-white'}`}>My Orders</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default ProfileNavbar;
