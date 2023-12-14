import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { Box, Card, CardBody, Image, Stack, Heading, Text, Divider, CardFooter, ButtonGroup, Button } from '@chakra-ui/react';
import { useCart } from '../Carrito/CarritoContext.jsx';
import Swal from 'sweetalert2'; // Importa SweetAlert
import app from '../firebase/firebase.js';

const ItemDetail = ({ producto: itemProducto }) => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const { dispatch } = useCart();

  useEffect(() => {
    const fetchProducto = async () => {
      if (id) {
        const db = getFirestore(app);
        const productoRef = doc(db, 'Productos', id);

        try {
          console.log('Before getting snapshot');
          const productoSnap = await getDoc(productoRef);
          console.log('After getting snapshot');

          if (productoSnap.exists()) {
            const productoData = {
              id: productoSnap.id,
              titulo: productoSnap.data().Nombre,
              imageSrc: productoSnap.data().Imagen,
              descripcion: productoSnap.data().Talle,
              precio: productoSnap.data().Precio,
            };

            console.log('Producto encontrado:', productoData);
            setProducto(productoData);
          } else {
            console.log('No se encontró el producto con ID:', id);
          }
        } catch (error) {
          console.error('Error al obtener el producto:', error);
          console.log('Error details:', error.details);
        }
      }
    };

    console.log('Before fetchProducto');
    fetchProducto();
    console.log('After fetchProducto');
  }, [id]);

  console.log('Before rendering');

  const manejarAgregarAlCarrito = () => {
    if (itemProducto) {
      dispatch({ type: 'ADD_TO_CART', payload: { ...itemProducto, cantidad } });
      console.log('Producto agregado al carrito:', { ...itemProducto, cantidad });

      
      Swal.fire({
        icon: 'success',
        title: 'Producto añadido al carrito',
        showConfirmButton: false,
        timer: 1500, 
      });
    }
  };

  const manejarIncrementarCantidad = () => {
    setCantidad((prevCantidad) => prevCantidad + 1);
  };

  const manejarDecrementarCantidad = () => {
    if (cantidad > 1) {
      setCantidad((prevCantidad) => prevCantidad - 1);
    }
  };

  if (!itemProducto) {
    return <p>No se encontró el producto con ID: {id}</p>;
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="calc(100vh - 60px)" mt={5}>
      <Card maxW='sm' className='itemdetail.container'>
        <CardBody>
          <Image className='detailImg' src={itemProducto.imageSrc} alt={itemProducto.titulo} borderRadius='lg' maxW='200px' maxH='300px' mx="auto" />
          <Stack mt='6' spacing='3'>
            <Heading size='md'>{itemProducto.titulo}</Heading>
            <Text>{itemProducto.descripcion}</Text>
            <Text color='blue.600' fontSize='2xl'>
              ${itemProducto.precio}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing='2'>
            <Button variant='solid' colorScheme='blue' onClick={manejarDecrementarCantidad}>
              -
            </Button>
            <Text>{cantidad}</Text>
            <Button variant='solid' colorScheme='blue' onClick={manejarIncrementarCantidad}>
              +
            </Button>
          </ButtonGroup>
          <Button variant='solid' colorScheme='blue' onClick={manejarAgregarAlCarrito}>
            Agregar al carrito
          </Button>
        </CardFooter>
      </Card>
    </Box>
  );
};

export default ItemDetail;
