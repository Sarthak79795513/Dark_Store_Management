///models/Order.js
// Mongoose model for orders, including deliveryDate
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  deliveryAddress: { type: String, required: true },
  deliveryDate: { type: Date, required: true },
  status: { type: String, default: 'Processed' },
}, {
  timestamps: true,
});
module.exports = mongoose.model('Order', orderSchema);