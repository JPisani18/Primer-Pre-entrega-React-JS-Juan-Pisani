import { Badge, Flex } from "@chakra-ui/react"

const CartWidget = () => {
  return (
    <div>
      <Flex>
      <Badge colorScheme='red'>5</Badge>
      <img src="src/assets/bolso.png" alt="bolso de compra" width='25px' height='25px' mr='10px'/>
      </Flex>
      
      </div>
  )
}

export default CartWidget