import React from "react";
import Banner from "../shop/banner"; 
import ProductList from "../shop/productList";
import "../main.css";

const FrontendShopPage = () => {
    return (
        <div>
            <Banner title="Product"/>
            <ProductList /> 
        </div>
    );
}

export default FrontendShopPage;