import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../redux/actions/APIActions';
import Cookies from 'js-cookie';
import FilterSelect from "./filter/filter";
import ProductCard from './productCard';
import SearchBox from "./searchBox";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.apireducer.fetchedProducts); 
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const token = Cookies.get('token');
    dispatch(fetchProducts(token));
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  return (
    <div className="bg-primary">
      <div className="p-4 flex">
        <FilterSelect products={products} setFilteredProducts={setFilteredProducts} />
        <div className="w-2/5 ml-10">
          <SearchBox products={products} setFilteredProducts={setFilteredProducts} />
        </div>
      </div>
      <div className="grid grid-cols-3 bg-primary justify-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} productItem={product} />
          ))
        ) : (
          <div>No products found.</div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
