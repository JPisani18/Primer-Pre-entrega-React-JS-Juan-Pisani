// Carrito.jsx
import React from 'react';
import { useCart } from './CarritoContext';
import { VStack, Box, Text, Button } from '@chakra-ui/react';

const Carrito = () => {
  const { cart, dispatch } = useCart();

  const handleRemoveFromCart = (itemId) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: { id: itemId },
    });
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + item.precio * item.cantidad;
    }, 0);
  };

  return (
    <VStack spacing={4} align="stretch">
      <h2>Carrito de compras</h2>
      {cart.map((item) => (
        <Box
          key={item.id}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={4}
        >
          <Text fontSize="xl">{item.titulo}</Text>
          <Text>Cantidad: {item.cantidad}</Text>
          <Text>Precio: ${item.precio * item.cantidad}</Text>
          <Button onClick={() => handleRemoveFromCart(item.id)} colorScheme="red">
            Eliminar
          </Button>
        </Box>
      ))}
      <Box>
        <Text fontSize="xl" fontWeight="bold" mt={4}>
          Valor total: ${calculateTotal()}
        </Text>
      </Box>
    </VStack>
  );
};

export default Carrito;
