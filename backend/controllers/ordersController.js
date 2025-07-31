// controllers/OrderController.js
const Inventory = require('../models/Inventory');
const Order     = require('../models/Orders');
const express = require('express');
const { checkInventory, processOrder } = require('../controllers/OrdersController')

// controllers/orderController.js
// const Inventory = require('../models/Inventory'); // or wherever your model is
// const Inventory = require('../models/Inventory');

exports.checkInventory = async (req, res) => {
  try {
    const { itemName, quantity } = req.body;

    const item = await Inventory.findOne({ name: itemName }); // ✅ use 'name' not 'itemName'
    if (!item) {
      return res.status(404).json({ message: 'Item not found in inventory' });
    }

    if (item.quantity < quantity) {
      return res.status(400).json({ message: 'Not enough stock available' });
    }

    return res.status(200).json({ message: 'Item is available' });
  } catch (err) {
    console.error('Error checking inventory:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.processOrder = async (req, res) => {
  try {
    const { itemName, quantity, deliveryAddress, deliveryDate } = req.body;

    // Step 1: Find item
    const item = await Inventory.findOne({ name: itemName });
    if (!item) {
      return res.status(404).json({ message: 'Item not found in inventory' });
    }

    // Step 2: Check quantity
    if (item.quantity < quantity) {
      return res.status(400).json({ message: 'Not enough stock available' });
    }

    // Step 3: Deduct stock
    item.quantity -= quantity;
    await item.save();

    // Step 4: Create order (optional)
    const newOrder = new Order({
      itemName,
      quantity,
      deliveryAddress,
      deliveryDate,
    });
    await newOrder.save();

    res.json({ message: 'Order processed successfully' });
  } catch (error) {
    console.error('❌ Error in processOrder:', error.message);
    res.status(500).json({ message: 'Server error during order processing' });
  }
};

