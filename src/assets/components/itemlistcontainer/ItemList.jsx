
import React from 'react';
import { Link } from 'react-router-dom';
import Item from './Item';
import './ItemList.css';

const ItemList = ({ productos }) => {
  return (
    <div className="item-list-container">
      {productos.map((producto) => (
        <div key={producto.id}>
          <Item producto={producto} />
        </div>
      ))}
    </div>
  );
};

export default ItemList;
