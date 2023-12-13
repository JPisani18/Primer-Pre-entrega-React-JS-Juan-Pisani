
import React from 'react';
import Item from './Item';
import './ItemList.css';

const ItemList = ({ productos }) => {
  console.log('Productos en ItemList:', productos);
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
