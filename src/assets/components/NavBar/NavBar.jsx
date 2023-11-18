import React from 'react';
import { Flex, Box, Heading, Spacer, Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import CartWidget from "../CartWidget/CartWidget";
import { NavLink } from "react-router-dom";
import { useCart } from '../Carrito/CarritoContext';

const NavBar = ({ onSelectCategory }) => {
  const { cart } = useCart();
  const cantidadEnCarrito = cart.reduce((total, item) => total + item.cantidad, 0);

  const handleCategorySelect = (categoryid) => {
    onSelectCategory(categoryid);
  };

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
                <NavLink to="/categorias/Remeras" onClick={() => handleCategorySelect('Remeras')}>
                  Remeras
                </NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink to="/categorias/Camperas" onClick={() => handleCategorySelect('Camperas')}>
                  Camperas
                </NavLink>
              </MenuItem>
              <MenuItem>
                <NavLink to="/categorias/Pantalones" onClick={() => handleCategorySelect('Pantalones')}>
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
