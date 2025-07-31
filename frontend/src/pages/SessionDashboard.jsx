import React, { useState, useEffect } from 'react';
import '../styles/sessionDashboard.css';

const SessionDashboard = () => {
  const [inventoryStatus, setInventoryStatus] = useState(0); // Total item quantity
  const [ordersPending, setOrdersPending] = useState(0);     // Pending order count

  useEffect(() => {
    // Fetch inventory and calculate total quantity
    fetch('http://localhost:8000/api/inventory')
      .then((res) => res.json())
      .then((data) => {
        if (data.inventoryCount !== undefined) {
          setInventoryStatus(data.inventoryCount); // ✅ Use returned count
        } else if (Array.isArray(data)) {
          // In case backend returns only the array
          const total = data.reduce((acc, item) => acc + (item.quantity || 0), 0);
          setInventoryStatus(total);
        }
      })
      .catch((err) => console.error('Inventory fetch error:', err));

    // Fetch pending orders
    fetch('http://localhost:8000/api/orders')
      .then((res) => res.json())
      .then((data) => {
        setOrdersPending(data.pendingOrders || 0);
      })
      .catch((err) => console.error('Orders fetch error:', err));
  }, []);

  const handleRestock = () => {
    fetch('http://localhost:8000/api/inventory', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ restockAmount: 10 }),
    })
      .then((res) => res.json())
      .then((data) => {
        setInventoryStatus(data.newInventoryCount || inventoryStatus + 10);
      })
      .catch((error) => console.error('Error restocking inventory:', error));
  };

  const handleProcessOrder = () => {
    fetch('http://localhost:8000/api/orders/process-order', {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((data) => {
        setOrdersPending(data.newPendingOrders || ordersPending - 1);
      })
      .catch((error) => console.error('Error processing order:', error));
  };

  return (
    <div className="session-dashboard">
      <div className="session-header">
        <h1>DarkStore System Dashboard</h1>
      </div>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Inventory Status</h3>
          <p>{inventoryStatus} items in stock</p>
        </div>

        <div className="card">
          <h3>Pending Orders</h3>
          <p>{ordersPending} orders waiting to be processed</p>
        </div>
      </div>

      <div className="action-buttons">
        <button onClick={handleRestock}>Restock Items</button>
        <button onClick={handleProcessOrder}>Process Order</button>
      </div>
    </div>
  );
};

export default SessionDashboard;
