import React from "react";
import ProfileNavbar from "../profile/profileNavbar";
import { Outlet } from "react-router-dom";

const ProfileHome = () => {
  return (
    <div className="bg-primary flex grid grid-cols-6">
        <div className="h-90rem m-5 rounded bg-gray-800">
            <ProfileNavbar />
        </div>
        <div className="col-span-5 py-4">
            <Outlet />
        </div>
    </div>
  );
};

export default ProfileHome;
