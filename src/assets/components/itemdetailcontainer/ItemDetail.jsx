
import React, { useState } from 'react';
import { Box, Card, CardBody, Divider, CardFooter, ButtonGroup, Button, Image, Stack, Heading, Text } from '@chakra-ui/react';
import { useCart } from "../Carrito/CarritoContext.jsx";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


const ItemDetail = ({ producto }) => {
  const [cantidad, setCantidad] = useState(1);
  const { dispatch } = useCart();

  const incrementarCantidad = () => {
    setCantidad(cantidad + 1);
  };

  const decrementarCantidad = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  const manejarAgregarAlCarrito = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id: producto.id,
        titulo: producto.titulo,
        precio: producto.precio,
        cantidad: cantidad,
      },
    });

    setCantidad(1);
    Swal.fire({
      icon: 'success',
      title: 'Producto agregado al carrito',
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="calc(100vh - 60px)"> {/* Resta la altura del NavBar para mantener el componente centrado */}
      <Card maxW='sm'>
        <CardBody>
          <Image src={import.meta.env.BASE_URL + producto.imageSrc} alt={producto.titulo} borderRadius='lg' />
          <Stack mt='6' spacing='3'>
            <Heading size='md'>{producto.titulo}</Heading>
            <Text>{producto.descripcion}</Text>
            <Text color='blue.600' fontSize='2xl'>
              ${producto.precio}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing='2'>
            <Button variant='solid' colorScheme='blue' onClick={decrementarCantidad}>
              -
            </Button>
            <Text>{cantidad}</Text>
            <Button variant='solid' colorScheme='blue' onClick={incrementarCantidad}>
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
