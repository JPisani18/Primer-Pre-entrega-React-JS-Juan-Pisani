
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CarritoProvider } from './assets/components/Carrito/CarritoContext.jsx';
import ItemListContainer from './assets/components/itemlistcontainer/ItemListContainer';
import NavBar from './assets/components/NavBar/NavBar.jsx';
import ItemDetailsContainer from './assets/components/itemdetailcontainer/ItemDetailsContainer';
import Carrito from './assets/components/Carrito/Carrito.jsx';
import Checkout from './assets/components/Checkout/Checkout.jsx'; 
import './App.css';

const App = () => {
  return (
    <CarritoProvider>
      <div className='app-container'>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path='/' element={<ItemListContainer />} />
            <Route path='/item/:itemId' element={<ItemDetailsContainer />} />
            <Route path='/carrito' element={<Carrito />} />
            <Route path='/checkout' element={<Checkout />} /> 
            <Route path="/category/:categoryid" element={<ItemListContainer />} />
          </Routes>
        </BrowserRouter>
      </div>
    </CarritoProvider>
  );
}

export default App;
