import React from 'react';
import { Flex, Box, Heading, Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import CartWidget from "../CartWidget/CartWidget";
import { NavLink } from "react-router-dom";
import { useCart } from '../Carrito/CarritoContext';
import '../NavBar/NavBar.css';

const NavBar = () => {
  const { cart } = useCart();
  const cantidadEnCarrito = cart.reduce((total, item) => total + item.cantidad, 0);

  return (
    <div className='navbar-container'>
      <Flex alignItems='center' justifyContent='space-between'>
        <Box p='2' ml={2} mt={3}>
          <NavLink to="/">
            <Heading size='md'>Mi Tienda</Heading>
          </NavLink>
        </Box>

        <Box p='2' mr={12} mt={3}>
          <Menu>
            <MenuButton as={Button} colorScheme='black' variant='outline' bg='gray.200'>
              Nuestros Productos
            </MenuButton>
            <MenuList>
              <MenuItem>
                <NavLink to="/category/remeras">
                  Remeras
                </NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink to="/category/camperas">
                  Camperas
                </NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink to="/category/pantalones">
                  Pantalones
                </NavLink>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>

        <Box p='2' mt={3} mr={3} alignItems='center'>
          <NavLink to="/carrito">
            <CartWidget cantidadEnCarrito={cantidadEnCarrito} />
          </NavLink>
        </Box>
      </Flex>
    </div>
  );
};

export default NavBar;
