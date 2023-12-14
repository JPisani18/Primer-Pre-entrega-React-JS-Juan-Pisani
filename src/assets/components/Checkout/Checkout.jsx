import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Carrito/CarritoContext';
import { VStack, Box, Text, Input, Button, Flex, Wrap, WrapItem, Checkbox } from '@chakra-ui/react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import app from '../firebase/firebase';
import Swal from 'sweetalert2';

const Checkout = () => {
  const { cart, dispatch } = useCart();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [confirmarEmail, setConfirmarEmail] = useState('');
  const [direccion, setDireccion] = useState('');
  const [localidad, setLocalidad] = useState('');
  const [cp, setCp] = useState('');
  const [infoCompleta, setInfoCompleta] = useState(false);
  const [metodosPago, setMetodosPago] = useState({
    efectivoPresencial: false,
    efectivoRapipago: false,
    transferencia: false,
    tarjetaDebito: false,
    tarjetaCredito: false,
  });

  const db = getFirestore(app);
  const navigate = useNavigate();

  useEffect(() => {
    const camposCompletos =
      nombre !== '' &&
      apellido !== '' &&
      telefono !== '' &&
      email !== '' &&
      confirmarEmail !== '' &&
      direccion !== '' &&
      localidad !== '' &&
      cp !== '';

    const metodoPagoSeleccionado =
      metodosPago.efectivoPresencial ||
      metodosPago.efectivoRapipago ||
      metodosPago.transferencia ||
      metodosPago.tarjetaDebito ||
      metodosPago.tarjetaCredito;

    
    setInfoCompleta(camposCompletos && metodoPagoSeleccionado);
  }, [nombre, apellido, telefono, email, confirmarEmail, direccion, localidad, cp, metodosPago]);

  const handleRealizarCompra = async () => {
    if (!infoCompleta) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Completa todos los campos y selecciona un método de pago.',
      });
      return;
    }

    const orderData = {
      items: cart.map((item) => ({
        id: item.id,
        cantidad: item.cantidad,
        precio: item.precio,
        imageSrc: item.imageSrc,
      })),
      fecha: new Date(),
      nombre,
      apellido,
      telefono,
      email,
      direccion,
      localidad,
      cp,
      estado: 'generada',
    };

    try {
      const docRef = await addDoc(collection(db, 'orders'), orderData);
      const orderId = docRef.id;
      Swal.fire({
        icon: 'success',
        title: 'Compra realizada con éxito',
        text: `Número de orden: ${orderId}`,
      }).then(() => {
        navigate('/');
      });
    } catch (error) {
      console.error('Error al realizar la compra:', error);
    }

    dispatch({ type: 'CLEAR_CART' });
  };

  const calcularTotal = () => {
    return cart.reduce((total, item) => total + item.precio * item.cantidad, 0);
  };

  const handleToggleMetodoPago = (metodo) => {
    setMetodosPago((prevMetodosPago) => ({
      efectivoPresencial: false,
      efectivoRapipago: false,
      transferencia: false,
      tarjetaDebito: false,
      tarjetaCredito: false,
      [metodo]: !prevMetodosPago[metodo],
    }));
  };

  return (
    <VStack spacing={4} align="center" justify="center" minHeight="100vh">
      {/* Productos */}
      <Wrap spacing="4">
        {cart.map((item) => (
          <WrapItem key={item.id}>
            <Box key={item.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} backgroundColor="white">
              <img src={item.imageSrc} alt={item.titulo} style={{ width: '150px', height: '150px', marginBottom: '10px' }} />
              <Text fontSize="xl">{item.titulo}</Text>
              <Text>Cantidad: {item.cantidad}</Text>
              <Text>Precio: ${item.precio * item.cantidad}</Text>
            </Box>
          </WrapItem>
        ))}
      </Wrap>

    
      <Text fontSize="xl" fontWeight="bold">
        Valor total: ${calcularTotal()}
      </Text>

     
      <Flex width="100%" justify="space-around" align="flex-start">
       
        <Flex direction="column" align="flex-start" justify="center" ml={5} width="45%">
          <Input
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            m={2}
            size="sm"
            width={400}
            style={{ backgroundColor: 'white', color: 'black', border: '1px solid #ccc', borderRadius: '4px', padding: '8px' }}
          />
          <Input
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            m={2}
            size="sm"
            width={400}
            style={{ backgroundColor: 'white', color: 'black', border: '1px solid #ccc', borderRadius: '4px', padding: '8px' }}
          />
          <Input
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            m={2}
            size="sm"
            width={400}
            style={{ backgroundColor: 'white', color: 'black', border: '1px solid #ccc', borderRadius: '4px', padding: '8px' }}
          />
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            m={2}
            size="sm"
            width={400}
            style={{ backgroundColor: 'white', color: 'black', border: '1px solid #ccc', borderRadius: '4px', padding: '8px' }}
          />
          <Input
            placeholder="Confirmar Email"
            value={confirmarEmail}
            onChange={(e) => setConfirmarEmail(e.target.value)}
            m={2}
            size="sm"
            width={400}
            style={{ backgroundColor: 'white', color: 'black', border: '1px solid #ccc', borderRadius: '4px', padding: '8px' }}
          />
          <Input
            placeholder="Dirección"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            m={2}
            size="sm"
            width={400}
            style={{ backgroundColor: 'white', color: 'black', border: '1px solid #ccc', borderRadius: '4px', padding: '8px' }}
          />
          <Input
            placeholder="Localidad"
            value={localidad}
            onChange={(e) => setLocalidad(e.target.value)}
            m={2}
            size="sm"
            width={400}
            style={{ backgroundColor: 'white', color: 'black', border: '1px solid #ccc', borderRadius: '4px', padding: '8px' }}
          />
          <Input
            placeholder="Codigo Postal"
            value={cp}
            onChange={(e) => setCp(e.target.value)}
            m={2}
            size="sm"
            width={400}
            style={{ backgroundColor: 'white', color: 'black', border: '1px solid #ccc', borderRadius: '4px', padding: '8px' }}
          />
        </Flex>

       
        <Flex direction="column" width="45%"  >
          <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}  backgroundColor="white" align="center" >
            <Text fontSize="xl" fontWeight="bold">Métodos de Pago</Text>
            <Box m={5}>
            <Checkbox
              isChecked={metodosPago.efectivoPresencial}
              onChange={() => handleToggleMetodoPago('efectivoPresencial')}
            >
              Efectivo (Presencial)
            </Checkbox>
            </Box>
            <Box m={5}>
            <Checkbox
              isChecked={metodosPago.efectivoRapipago}
              onChange={() => handleToggleMetodoPago('efectivoRapipago')}
            >
              Efectivo (Rapipago)
            </Checkbox>
            </Box>
            <Box m={5}>
            <Checkbox
              isChecked={metodosPago.transferencia}
              onChange={() => handleToggleMetodoPago('transferencia')}
            >
              Transferencia
            </Checkbox>
            </Box>
            <Box m={5}>
            <Checkbox
              isChecked={metodosPago.tarjetaDebito}
              onChange={() => handleToggleMetodoPago('tarjetaDebito')}
            >
              Tarjeta de Débito
            </Checkbox>
            </Box>
            <Box m={5}>
            <Checkbox
              isChecked={metodosPago.tarjetaCredito}
              onChange={() => handleToggleMetodoPago('tarjetaCredito')}
            >
              Tarjeta de Crédito
            </Checkbox>
            </Box>
            
            <Button colorScheme="blue" onClick={handleRealizarCompra} isDisabled={!infoCompleta || !cart.length} m={2}>
              Finalizar compra
            </Button>
          </Box>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default Checkout;
