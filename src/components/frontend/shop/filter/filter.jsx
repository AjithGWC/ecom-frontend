import { useEffect } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../../../redux/actions/APIActions';
import './filter.css';

const FilterSelect = ({ products, setFilteredProducts }) => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.apireducer.fetchedCategories) || []; 

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const categoryOptions = categories.map(category => ({
        value: category._id,
        label: category.Name,
    }));

    const handleChange = (selectedOption) => {
        if (selectedOption) {
            const filteredProducts = products.filter(
                product => product.categoryId === selectedOption.value
            );  
            setFilteredProducts(filteredProducts);
        } else {
            setFilteredProducts(products);
        }
    };

    return (
        <Select
            options={categoryOptions}
            isClearable
            placeholder="Filter By Category"
            classNamePrefix="custom-select"
            onChange={handleChange}
        />
    );
};

export default FilterSelect;
