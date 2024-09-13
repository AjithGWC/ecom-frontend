import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsById, fetchCategoriesById, fetchProducts } from '../../../redux/actions/APIActions';
import Banner from "../shop/banner";
import ProductView from "../product/productView";
import ProductsSuggestion from "../product/productSuggestion";

const Product = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const product = useSelector((state) => state.apireducer.fetchedProductById);
    const category = useSelector((state) => state.apireducer.fetchedCategoryById);
    const allProducts = useSelector((state) => state.apireducer.fetchedProducts);
    const [productsSuggestion, setProductsSuggestion] = useState([]);

    useEffect(() => {
        
        dispatch(fetchProductsById(id));
        dispatch(fetchCategoriesById(product.categoryId));
        dispatch(fetchProducts());
    }, [id, dispatch]);

    useEffect(() => {
        if (product) {
            const related = allProducts.filter(p => p.categoryId === product.categoryId && p._id !== id);
            setProductsSuggestion(related);
        }
    }, [product, allProducts, id]);

    if (!product) {
        return <p>Loading...</p>; 
    }

    return (
        <div className="bg-primary">
            <Banner title={category?.Name || "Category"} />
            <ProductView product={product} category={category} />
            <h1 className="text-2xl ml-4 mt-4 bg-white p-3 w-1/5">You might also like</h1>
            <ProductsSuggestion products={productsSuggestion} fallbackProducts={allProducts} />
        </div>
    );
};

export default Product;
