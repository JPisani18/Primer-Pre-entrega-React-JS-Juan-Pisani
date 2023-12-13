import React, { useState } from 'react';
import { useCart } from '../Carrito/CarritoContext';
import { VStack, Box, Text, Input, Button } from '@chakra-ui/react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import app from '../firebase/firebase';

const Checkout = () => {
  const { cart, dispatch } = useCart();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');

  const db = getFirestore(app); 

  const handleRealizarCompra = async () => {
    const orderData = {
      items: cart.map(item => ({
        id: item.id,
        cantidad: item.cantidad,
        precio: item.precio,
      })),
      fecha: new Date(),
      nombre,
      apellido,
      telefono,
      email,
      estado: 'generada',
    };

    try {
      const docRef = await addDoc(collection(db, 'orders'), orderData);
      const orderId = docRef.id;
      alert(`Compra realizada con éxito. Número de orden: ${orderId}`);
    } catch (error) {
      console.error('Error al realizar la compra:', error);
    }
    dispatch({ type: 'CLEAR_CART' });
  };

  const calcularTotal = () => {
    return cart.reduce((total, item) => total + item.precio * item.cantidad, 0);
  };

  return (
    <VStack spacing={4} align="stretch">
      <h2>Checkout</h2>
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
        </Box>
      ))}
      <Box>
        <Text fontSize="xl" fontWeight="bold" mt={4}>
          Valor total: ${calcularTotal()}
        </Text>
        <Input
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          mb={2}
        />
        <Input
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          mb={2}
        />
        <Input
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          mb={2}
        />
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          mb={2}
        />
        <Button colorScheme="blue" onClick={handleRealizarCompra} isDisabled={!cart.length}>
          Realizar compra
        </Button>
      </Box>
    </VStack>
  );
};

export default Checkout;
