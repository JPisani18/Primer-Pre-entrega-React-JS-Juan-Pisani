
import React, { useState, useEffect } from 'react';
import ItemList from './ItemList';
import { useParams } from 'react-router-dom';
import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const { categoryid } = useParams();

  useEffect(() => {
    const cargarProductos = async () => {
      const db = getFirestore();
      const productosCollection = collection(db,'Productos');
  
      try {
        let querySnapshot;
  
        if (categoryid) {
          const categoryQuery = query(productosCollection, where('Categoría', '==', categoryid));
          querySnapshot = await getDocs(categoryQuery);
        } else {
          querySnapshot = await getDocs(productosCollection);
        }
  
        const data = querySnapshot.docs.map((doc) => ({ 
          id: doc.id, 
          imageSrc:doc.data().Imagen,
          titulo: doc.data().Nombre,
           }));
        console.log('Productos cargados:', data); 
        setProductos(data);
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    };
  
    cargarProductos();
  }, [categoryid]);

  return (
    <div>
      <ItemList productos={productos} />
    </div>
  );
};

export default ItemListContainer;
