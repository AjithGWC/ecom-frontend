import React, { useState } from 'react';
import { Search } from 'react-feather';

const SearchBox = ({ setFilteredProducts, products }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.Name.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className='flex items-center border rounded-lg p-2 w-full md:w-64'>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search products..."
        className="w-full p-2 outline-none text-sm"
      />
      <Search className='text-gray-400 ml-2' />
    </div>
  );
};

export default SearchBox;
