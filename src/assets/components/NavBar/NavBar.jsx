import React from 'react';
import { Flex, Box, Heading, Spacer, Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import CartWidget from "../CartWidget/CartWidget";
import { Link } from "react-router-dom";
import { useCart } from '../Carrito/CarritoContext';

const NavBar = ({ onSelectCategory }) => {
  const handleCategorySelect = (categoria) => {
    onSelectCategory(categoria);
  };

  const { cart } = useCart();
  const cantidadEnCarrito = cart.reduce((total, item) => total + item.cantidad, 0);

  return (
    <div>
      <Flex minHeight='15vh' alignItems='center' gap='2'>
        <Box p='2'>
          <Link to="/">
            <Heading size='md'>Mi Tienda</Heading>
          </Link>
        </Box>

        <Spacer />

        <Box p='2'>
          <Menu>
            <MenuButton as={Button} colorScheme='black' variant='outline' bg='gray.200'>
              Nuestros Productos
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Link to="/categorias/Remeras" onClick={() => handleCategorySelect('Remeras')}>
                  Remeras
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/categorias/Camperas" onClick={() => handleCategorySelect('Camperas')}>
                  Camperas
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/categorias/Pantalones" onClick={() => handleCategorySelect('Pantalones')}>
                  Pantalones
                </Link>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>

        <Spacer />

        <Box p='2'>
         <Link to="/carrito">
         <CartWidget cantidadEnCarrito={cantidadEnCarrito} />
         </Link>
        </Box>
      </Flex>
    </div>
  );
};

export default NavBar;
