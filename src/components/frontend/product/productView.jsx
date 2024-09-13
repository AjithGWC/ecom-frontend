import React from "react";
import "./productView.css";

const productView = ({ product, category }) => {
  return (
    <section className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex md:flex-row justify-center items-start space-y-8 md:space-y-0 md:space-x-8">
          <div className="w-full md:w-1/2">
            <img
              loading="lazy"
              src={product?.image}
              alt={product?.productName || "product Image"}
              className="h-60 object-cover mx-auto rounded-lg shadow-md"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">{product?.Name}</h2>
            
            <div className="flex flex-col space-y-2">
              <span className="text-xl font-semibold text-gray-800">${product?.price}</span>
              <span className="text-gray-600">Category: {category?.Name}</span>
            </div>
            <p className="text-gray-700">{product?.description}</p>
            <input
              className="w-1/4 py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="number"
              placeholder="Qty"
            />
            <button
              aria-label="Add to Cart"
              type="button"
              className="w-1/5 add-cart text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default productView;
