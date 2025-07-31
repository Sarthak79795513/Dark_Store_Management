const express = require('express');
const router = express.Router();
const {
  getInventory,
  restockInventory,
  getPendingOrders,
  processOrder
} = require('../controllers/dashboardController');

// Route setup using controller functions
router.get('/inventory', getInventory);
router.post('/inventory', restockInventory);

router.get('/orders', getPendingOrders);
router.post('/orders', processOrder);

module.exports = router;
