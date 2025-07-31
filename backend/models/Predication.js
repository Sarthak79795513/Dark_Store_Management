const mongoose = require('mongoose');

const predictionSchema = new mongoose.Schema({
  sales_volume: Number,
  orders: Number,
  date: String,
  predicted_stock_level: Number,
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Prediction', predictionSchema);
// This model defines the structure of the prediction data that will be stored in the MongoDB database.