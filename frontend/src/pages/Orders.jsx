// src/components/OrderForm.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/orders.css';

const OrderForm = () => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [available, setAvailable] = useState(null);
  const [message, setMessage] = useState('');

  // 1. Check inventory availability
  const handleCheckInventory = async () => {
    try {
      const { data } = await axios.post(
        'http://localhost:8000/api/orders/check-inventory',
        {
          itemName,       // sends itemName to match your schema
          quantity
        }
      );
      setAvailable(true);
      setMessage(data.message);
    } catch (err) {
      setAvailable(false);
      setMessage(err.response?.data.message || 'Error checking inventory');
    }
  };

  // 2. Process the order once availability is confirmed
  const handleSubmitOrder = async () => {
    if (!available) {
      setMessage('Please check availability first.');
      return;
    }
    if (!deliveryAddress || !deliveryDate) {
      setMessage('Please enter both a delivery date and address.');
      return;
    }

    try {
     const { data } = await axios.post(
    'http://localhost:8000/api/orders/process-order',
  {
      itemName,
      quantity,
      deliveryAddress,
      deliveryDate: new Date(deliveryDate).toISOString() // added this
  }
);


      setMessage(
        `👍 Order confirmed! Delivery on ${deliveryDate} to ${deliveryAddress}.`
      );
      setAvailable(null);
      // Optionally clear the form:
      setItemName('');
      setQuantity(1);
      setDeliveryAddress('');
      setDeliveryDate('');
    } catch (err) {
      setMessage(err.response?.data.message || 'Error processing order');
    }
  };

  return (
    <div className="order-form">
      <h2>Place an Order</h2>

      {/* Step 1: Item & Quantity */}
      <input
        type="text"
        placeholder="Item Name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <input
        type="number"
        min="1"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <button onClick={handleCheckInventory}>
        Check Availability
      </button>

      {/* Step 2: Delivery details (only if available) */}
      {available && (
        <>
          <input
            type="date"
            placeholder="Delivery Date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
          />
          <input
            type="text"
            placeholder="Delivery Address"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
          />
          <button onClick={handleSubmitOrder}>
            Submit Order
          </button>
        </>
      )}

      {/* Status message */}
      <p className={`message ${available ? 'success' : ''}`}>
        {message}
      </p>
    </div>
  );
};

export default OrderForm;
