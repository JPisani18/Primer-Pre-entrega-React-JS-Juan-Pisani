import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import { CarritoProvider } from './assets/components/Carrito/CarritoContext.jsx';
import { initializeApp } from 'firebase/app';
import app from '../src/assets/components/firebase/firebase.js';


ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <CarritoProvider>
      <App />
    </CarritoProvider>
  </ChakraProvider>
);
