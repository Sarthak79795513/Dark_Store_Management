import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InventoryList = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/inventory')
      .then(response => setInventory(response.data))
      .catch(error => console.error('Error fetching inventory:', error));
  }, []);

  return (
    <div>
      <h2>Inventory List</h2>
      <ul>
        {inventory.map(item => (
          <li key={item.id}>{item.name} - {item.quantity} in stock</li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryList;
