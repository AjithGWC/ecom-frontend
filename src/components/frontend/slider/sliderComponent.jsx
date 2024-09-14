import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SlideCard from "./slidercards";
import { fetchCategories } from '../../../redux/actions/APIActions'; 

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      className="absolute top-1/2 left-4 z-10 bg-gray-800 text-white rounded-full p-2 cursor-pointer transform -translate-y-1/2"
      onClick={onClick}
    >
      &#10094; 
    </button>
  );
};

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      className="absolute top-1/2 right-4 z-10 bg-gray-800 text-white rounded-full p-2 cursor-pointer transform -translate-y-1/2"
      onClick={onClick}
    >
      &#10095;
    </button>
  );
};

const SliderHome = () => {
  const dispatch = useDispatch();
  const sliderData = useSelector(state => state.apireducer.fetchedCategories); 

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const settings = {
    nav: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <section className="bg-primary py-8 relative">
      <div className="container mx-auto px-4 md:px-8">
        <Slider {...settings}>
          {sliderData.map((value, index) => (
            <SlideCard key={index} id={value._id} title={value.Name} cover={value.image} desc={value.description} />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default SliderHome;