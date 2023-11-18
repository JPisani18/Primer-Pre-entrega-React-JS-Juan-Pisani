import { Badge, Flex } from "@chakra-ui/react";

const CartWidget = ({ cantidadEnCarrito }) => {
  return (
    <Flex>
      <Badge colorScheme="gray">{cantidadEnCarrito}</Badge>
      <img src="public/img/bolso.png" alt="bolso de compra" width="25px" height="25px" mr="10px" />
    </Flex>
  );
};

export default CartWidget;
