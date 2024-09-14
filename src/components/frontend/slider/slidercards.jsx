import React from "react";
import { useNavigate } from 'react-router-dom';

const SlideCard = ({ id, title, desc, cover }) => {
  const navigate = useNavigate();
  const navigateShop = () => {
    navigate('/shop');
  }

  return (
    <div className="box bg-white shadow-md h-full flex flex-col md:flex-row items-center justify-center">
      <div className="w-full md:w-1/2">
        <img
          src={cover}
          alt={title}
          className="w-full h-96 md:h-96 object-cover cursor-pointer"
          onClick={navigateShop}
        />
      </div>
      <div className="w-full md:w-1/2 text-center md:text-left">
      </div>
    </div>
  );
};

export default SlideCard; 
