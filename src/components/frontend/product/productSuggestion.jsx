import React from "react";
import ProductCard from "../shop/productCard"; 

const ProductsSuggestion = ({ products, fallbackProducts }) => {
    const displayProducts = products.length > 0 ? products : fallbackProducts;
    return (
        <div className="grid grid-cols-3 bg-primary justify-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {displayProducts.length > 0 ? (
                displayProducts.map((product) => (
                    <ProductCard key={product._id} productItem={product} />
                ))
            ) : (
                <p>No related products found.</p>
            )}
        </div>
    );
};

export default ProductsSuggestion;
