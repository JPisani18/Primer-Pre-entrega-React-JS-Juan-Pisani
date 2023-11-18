
import React, { useEffect, useState } from 'react';
import ItemDetail from './ItemDetail';
import { useParams } from 'react-router-dom';

const ItemDetailsContainer = () => {
  const { itemId } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        const response = await fetch('/src/productos.json');
        const productos = await response.json();

        const productoEncontrado = productos.find((p) => p.id === parseInt(itemId, 10));

        if (productoEncontrado) {
          setProducto(productoEncontrado);
        } else {
          throw new Error('Producto no encontrado');
        }
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    };

    cargarProducto();
  }, [itemId]);

  return (
    <div>
      {producto ? (
        <ItemDetail producto={producto} />
      ) : (
        <p>Cargando detalles del producto...</p>
      )}
    </div>
  );
};

export default ItemDetailsContainer;
