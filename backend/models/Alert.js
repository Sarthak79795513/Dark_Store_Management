const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  message: { type: String, required: true },
  type:    { type: String, default: "inventory" }, // or 'order', 'system'
  severity:{ type: String, default: "low" }, // 'low', 'medium', 'high'
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Alert", alertSchema);
