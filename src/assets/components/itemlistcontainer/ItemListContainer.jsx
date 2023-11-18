

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import ItemList from './ItemList';
import ProductListLoader from '../itemlistcontainer/ProductListLoader.jsx';

const ItemListContainer = ({ onSelectCategory, selectedCategory }) => {
  const [productos, setProductos] = useState([]);

  
  const productosFiltrados = useMemo(() => {
    return selectedCategory
      ? productos.filter((producto) => producto.categoria === selectedCategory)
      : productos;
  }, [productos, selectedCategory]);

 
  const handleSelectCategory = useCallback(
    (categoria) => {
      onSelectCategory(categoria);
    },
    [onSelectCategory]
  );

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const response = await fetch('src/productos.json');
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    };

    cargarProductos();
  }, []);

  return (
    <div>
      <ProductListLoader
        productos={productosFiltrados}
        onSelectCategory={handleSelectCategory}
      />
    </div>
  );
};

export default ItemListContainer;
