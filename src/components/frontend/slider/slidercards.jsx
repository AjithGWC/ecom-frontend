import React from "react";
import { useNavigate } from 'react-router-dom';

const SlideCard = ({ id, title, desc, cover }) => {
  const navigate = useNavigate();
  const navigateShop = () => {
    navigate('/shop');
  }

  return (
    <div className="box bg-white shadow-md h-full flex items-center justify-center">
      <div className="flex md:flex-row w-full h-full">
          <img
            src={cover}
            alt={title}
            className="w-full h-96 object-cover" 
            onClick={navigateShop}
          />
      </div>
    </div>
  );
};

export default SlideCard; 
