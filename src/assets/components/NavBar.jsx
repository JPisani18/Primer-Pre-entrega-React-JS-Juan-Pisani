import { Flex,Box, Heading, Spacer, Menu, MenuButton, MenuList, MenuItem, Button,  } from "@chakra-ui/react"
import CartWidget from "./CartWidget"

const NavBar = () => {
  return (
    <div><Flex minWidth='max-content' minHeight='15vh' alignItems='center' gap='2'>

    <Box p='2'>
  
      <Heading size='md'>Mi Tienda</Heading>
  
    </Box>
  
    <Spacer />
    
    <Box p='2'>
       <Menu>
         <MenuButton as={Button} colorScheme='black' variant='outline' bg='gray.200'>
           Nuestros Productos
         </MenuButton>
             <MenuList >
               <MenuItem>Remeras</MenuItem>
               <MenuItem>Buzos</MenuItem>
               <MenuItem>Camperas</MenuItem>
               <MenuItem>Pantalones</MenuItem>
               <MenuItem>Calzas</MenuItem>
             </MenuList>
       </Menu>
    </Box>

    

    <Spacer />

    <Box p='2'>
      <CartWidget />
    </Box>
    
  
  </Flex>
  </div>
  )
}

export default NavBar