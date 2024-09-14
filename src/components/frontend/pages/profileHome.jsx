import React from "react";
import ProfileNavbar from "../profile/profileNavbar";
import { Outlet } from "react-router-dom";
import "../profile/profile.css"

const ProfileHome = () => {
  return (
    <div className="bg-primary flex grid grid-cols-6">
          <div className="profile-navbar-container">
            <ProfileNavbar />
        </div>
        <div className="col-span-5 py-4">
            <Outlet />
        </div>
    </div>
  );
};

export default ProfileHome;
