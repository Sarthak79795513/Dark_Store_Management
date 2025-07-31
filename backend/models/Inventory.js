// models/InventoryItem.js
const mongoose = require("mongoose")

const inventorySchema = new mongoose.Schema({
  name:     { type: String, required: true },
  type:     { type: String, required: true },
  quantity: { type: Number, required: true },
  price:    { type: Number, required: true },
  status:   { type: String, default: "in stock" }
})

module.exports = mongoose.model("InventoryItem", inventorySchema)
