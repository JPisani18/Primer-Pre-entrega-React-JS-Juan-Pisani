import React, { useEffect, useState } from 'react';
import ItemDetail from './ItemDetail';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from '../firebase/firebase';

const ItemDetailsContainer = () => {
  const [producto, setProducto] = useState();
  const { itemId } = useParams();
  useEffect(() => {
    const cargarProducto = async () => {
      console.log('Cargando producto con ID:', itemId);

      const db = getFirestore(app);
      const productoDoc = doc(db, 'Productos', itemId);

      try {
        console.log('Before getting snapshot');
        const docSnapshot = await getDoc(productoDoc);
        console.log('After getting snapshot');

        if (docSnapshot.exists()) {
          const productoData = {
            id: docSnapshot.id,
            imageSrc: docSnapshot.data().Imagen,
            titulo: docSnapshot.data().Nombre,
            precio: docSnapshot.data().Precio,
            descripcion: docSnapshot.data().Talle,
          };

          console.log('Producto encontrado:', productoData);
          setProducto(productoData);
        } else {
          console.log('No se encontró el producto con ID:', itemId);
        }
      } catch (error) {
        console.error('Error al cargar producto:', error);
      }
    };

    console.log('Before cargarProducto');
    cargarProducto();
    console.log('After cargarProducto');
  }, [itemId]);

  console.log('Before rendering');

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
