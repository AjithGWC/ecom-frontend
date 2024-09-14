import React from "react";
import SliderHome from "../slider/sliderComponent";
import ProductList from "../shop/productList";
import "../main.css"

const FrontendHomePage = () => {
    return (
        <div>
            <SliderHome />
            <ProductList />
        </div>
    );
}

export default FrontendHomePage;