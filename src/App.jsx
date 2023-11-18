import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CarritoProvider } from './assets/components/Carrito/CarritoContext.jsx';
import ItemListContainer from './assets/components/itemlistcontainer/ItemListContainer';
import NavBar from './assets/components/NavBar/NavBar.jsx';
import ItemDetailsContainer from './assets/components/itemdetailcontainer/ItemDetailsContainer';
import Carrito from './assets/components/Carrito/Carrito.jsx'; 
import './App.css';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelectCategory = (categoria) => {
    setSelectedCategory(categoria);
  };

  return (
    <CarritoProvider>
      <div className='app-container' >
        <BrowserRouter>
          <NavBar onSelectCategory={handleSelectCategory} /> 
          <Routes>
            <Route path='/' element={<ItemListContainer onSelectCategory={handleSelectCategory} selectedCategory={selectedCategory} />} />
            <Route path='/item/:itemId' element={<ItemDetailsContainer />} />
            <Route path='/carrito' element={<Carrito />} />
            <Route path="/categorias/:categoria" element={<ItemListContainer onSelectCategory={handleSelectCategory} selectedCategory={selectedCategory} />} />
          </Routes>
        </BrowserRouter>
      </div>
    </CarritoProvider>
  );
}

export default App;