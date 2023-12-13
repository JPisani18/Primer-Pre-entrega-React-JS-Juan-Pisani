import React from 'react';
import { Flex, Box, Heading, Spacer, Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import CartWidget from "../CartWidget/CartWidget";
import { NavLink } from "react-router-dom";
import { useCart } from '../Carrito/CarritoContext';
import '../NavBar/NavBar.css'
const NavBar = () => {
  const { cart } = useCart();
  const cantidadEnCarrito = cart.reduce((total, item) => total + item.cantidad, 0);

  return (
    <div>
      <Flex minHeight='15vh' alignItems='center' gap='2'>
        <Box p='2'>
          <NavLink to="/" >
            <Heading size='md'>Mi Tienda</Heading>
          </NavLink>
        </Box>

        <Spacer />

        <Box p='2'>
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

        <Spacer />

        <Box p='2'>
          <NavLink to="/carrito">
            <CartWidget cantidadEnCarrito={cantidadEnCarrito} />
          </NavLink>
        </Box>
      </Flex>
    </div>
  );
};

export default NavBar;
