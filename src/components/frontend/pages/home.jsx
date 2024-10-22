import React from "react";
import SliderHome from "../slider/sliderComponent";
import ProductList from "../shop/productList";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../main.css"

const FrontendHomePage = () => {
    return (
        <div>
            <SliderHome />
            <ProductList />
            <ToastContainer />
        </div>
    );
}

export default FrontendHomePage;