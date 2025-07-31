import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/orders.css'; // if you have styles

const OrderDashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/orders/all')
      .then((res) => {
        console.log("Fetched Orders:", res.data);
        setOrders(res.data);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
      });
  }, []);

  return (
    <div className="order-dashboard">
      <h2>All Processed Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Delivery Date</th>
            <th>Address</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, idx) => (
            <tr key={idx}>
              <td>{order.itemName}</td>
              <td>{order.quantity}</td>
              <td>{new Date(order.deliveryDate).toLocaleDateString()}</td>
              <td>{order.deliveryAddress}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDashboard;
