// routes/logistics.js
const express = require('express');
const Delivery = require('../models/Delivery');
const Order = require('../models/Orders'); // Assuming you have an Order model

const router = express.Router();

// Fetch all deliveries
router.get('/', async (req, res) => {
  try {
    const deliveries = await Delivery.find();
    res.json(deliveries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching deliveries' });
  }
});

// Create a new delivery
router.post('/', async (req, res) => {
  const { deliveryId, orderId, address, status } = req.body;

  if (!deliveryId || !orderId || !address) {
    return res.status(400).json({ message: 'Please fill in all required fields.' });
  }

  try {
    // Check if the order exists and is confirmed
    const order = await Order.findOne({ orderId });
    if (!order || order.status !== 'confirmed') {
      return res.status(400).json({ message: 'Order not confirmed. Cannot process delivery.' });
    }

    const newDelivery = new Delivery({
      deliveryId,
      orderId,
      address,
      status,
    });

    await newDelivery.save();
    res.status(201).json(newDelivery);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating delivery' });
  }
});

// Update delivery status
router.patch('/:id', async (req, res) => {
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: 'Status is required' });
  }

  try {
    const updatedDelivery = await Delivery.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedDelivery) {
      return res.status(404).json({ message: 'Delivery not found' });
    }

    res.json(updatedDelivery);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating delivery status' });
  }
});

// Delete a delivery
router.delete('/:id', async (req, res) => {
  try {
    const deletedDelivery = await Delivery.findByIdAndDelete(req.params.id);
    if (!deletedDelivery) {
      return res.status(404).json({ message: 'Delivery not found' });
    }
    res.json({ message: 'Delivery deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting delivery' });
  }
});

module.exports = router;
