import { Spinner, Center } from '@chakra-ui/react'

const ItemListContainer = ({greeting}) => {
  return (
    <div><Center bg='Black' h='100px' color='white' fontSize='2xl'>
    { greeting } <Spinner/>
  </Center>
      </div>
  )
}

export default ItemListContainer