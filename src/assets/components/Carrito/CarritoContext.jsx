import React, { createContext, useContext, useReducer } from 'react';

const CarritoContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.payload];
    case 'REMOVE_FROM_CART':
      return state.filter((item) => item.id !== action.payload.id);
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

const useCart = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCart debe estar dentro de un proveedor del contexto de Carrito');
  }
  return context;
};

const CarritoProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <CarritoContext.Provider value={{ cart, dispatch }}>
      {children}
    </CarritoContext.Provider>
  );
};

export { CarritoContext, useCart, CarritoProvider };
