import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./profile.css"

const ProfileNavbar = () => {
  const location = useLocation();
  return (
    <nav className="profile-navbar p-4">
      <div className="container mx-auto">
        <ul className={`space-y-4 md:space-x-4 text-white ${window.innerWidth <= 768 ? 'horizontal' : ''}`}>
          <li className="p-3 ml-5 md:ml-0">
            <Link
              to=""
              className={`${location.pathname.includes("/profile") && !location.pathname.includes("/orders") ? 'active' : ''}`}
            >
              Overview
            </Link>
          </li>
          <li className="p-3">
            <Link
              to="orders"
              className={`${location.pathname.includes('/orders') ? 'active' : ''}`}
            >
              My Orders
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default ProfileNavbar;
