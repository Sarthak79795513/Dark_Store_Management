// models/delivery.js
const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  deliveryId: {
    type: String,
    required: true,
    unique: true,
  },
  orderId: {
    type: String,
    required: true,
    ref: 'Order', // Assuming you have an "Order" model to reference the orderId
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'in transit', 'delivered', 'issue'],
    default: 'pending',
  },
  deliveryDate: {
    type: Date,
    default: Date.now,
  },
});

// Create the Delivery model based on the schema
const Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = Delivery;
