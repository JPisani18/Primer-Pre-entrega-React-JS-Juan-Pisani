import React, { useEffect, useState } from 'react';
import ItemDetail from './ItemDetail';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from '../firebase/firebase';

const ItemDetailsContainer = () => {
  const { itemId } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const cargarProducto = async () => {
      const db = getFirestore(app);
      const productoDoc = doc(db, 'Productos', itemId);

      try {
        const docSnapshot = await getDoc(productoDoc);

        if (docSnapshot.exists()) {
          setProducto({
            id: docSnapshot.id, 
            imageSrc: docSnapshot.data().Imagen,
            titulo: docSnapshot.data().Nombre,
            precio: docSnapshot.data().Precio,
            descripcion: docSnapshot.data().Talle
          });
        } else {
          throw new Error('Producto no encontrado');
        }
      } catch (error) {
        console.error('Error al cargar producto:', error);
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
