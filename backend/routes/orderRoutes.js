const express = require('express');
const router = express.Router();

const { checkInventory, processOrder } = require('../controllers/OrdersController');

// GET all orders
router.get('/all', async (req, res) => {
  try {
    const Order = require('../models/Orders');
    const orders = await Order.find().sort({ createdAt: -1 }); // latest first
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders' });
  }
});


// POST http://localhost:8000/api/orders/check-inventory
router.post('/check-inventory', checkInventory);

// POST http://localhost:8000/api/orders/process-order
router.post('/process-order', processOrder);
// POST /api/orders/add
router.post('/orders/add', (req, res) => {
  store.pendingOrders += 1;
  res.json({ pendingOrders: store.pendingOrders });
});


module.exports = router;
