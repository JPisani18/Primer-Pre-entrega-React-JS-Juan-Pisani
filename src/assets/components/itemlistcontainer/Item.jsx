// Item.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardFooter, ButtonGroup, Button, Image, Stack, Heading, Divider } from '@chakra-ui/react';
import '../itemlistcontainer/Item.css';

const Item = ({ producto }) => {
  return (
    <div>
      <Card maxW='sm'>
        <CardBody>
          <Image src={producto.imageSrc} alt={producto.titulo} borderRadius='lg' />
          <Stack mt='6' spacing='3'>
            <Heading size='md'>{producto.titulo}</Heading>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing='2'>
            <Link to={`/item/${producto.id}`}>
              <Button variant='solid' colorScheme='blue'>
                Detalles
              </Button>
            </Link>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Item;
