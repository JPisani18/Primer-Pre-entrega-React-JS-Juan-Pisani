
import React, { useEffect } from 'react';
import ItemList from './ItemList';

const ProductListLoader = ({ productos, onSelectCategory }) => {
  useEffect(() => {
    
    onSelectCategory();
  }, [onSelectCategory]);


  return <ItemList productos={productos} />;
};

export default ProductListLoader;
