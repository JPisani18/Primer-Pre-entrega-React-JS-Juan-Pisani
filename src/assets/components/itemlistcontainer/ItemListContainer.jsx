import React, { useState, useEffect } from 'react';
import ItemList from './ItemList';
import { useParams } from 'react-router-dom';

const ItemListContainer = ({ onSelectCategory }) => {
  const [productos, setProductos] = useState([]);
  const { categoryid } = useParams();

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const response = await fetch('/src/productos.json');
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    };

    cargarProductos();
  }, []);

  useEffect(() => {
    if (categoryid) {
      if (typeof onSelectCategory === 'function') {
        onSelectCategory(categoryid);
      }
    }
  }, [categoryid, onSelectCategory]);

  const productosFiltrados = categoryid
    ? productos.filter((producto) => producto.categoria === categoryid)
    : productos;

  return (
    <div>
      <ItemList productos={productosFiltrados} />
    </div>
  );
};

export default ItemListContainer;
