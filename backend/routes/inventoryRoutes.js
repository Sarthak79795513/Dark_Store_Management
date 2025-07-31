// routes/inventoryRoutes.js

const express = require("express");
const router = express.Router();
const InventoryItem = require("../models/Inventory");

// @route   GET /api/inventory
// @desc    Get all inventory items
// @access  Public (or you can add auth middleware)
router.get("/", async (req, res) => {
  try {
    const items = await InventoryItem.find();
    res.json(items);
  } catch (err) {
    console.error("Error fetching inventory:", err);
    res.status(500).json({ message: "Server error fetching inventory." });
  }
});

// @route   POST /api/inventory
// @desc    Create a new inventory item
// @access  Public (or you can add auth middleware)
router.post("/", async (req, res) => {
  const { name, type, quantity, price, status } = req.body;

  // Simple validation
  if (!name || !type || quantity == null || price == null) {
    return res
      .status(400)
      .json({ message: "name, type, quantity, and price are required." });
  }

  try {
    const newItem = new InventoryItem({
      name,
      type,
      quantity,
      price,
      status: status || "in stock",
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    console.error("Error saving inventory item:", err);
    res.status(500).json({ message: "Server error saving inventory item." });
  }
});

// @route   GET /api/inventory/:id
// @desc    Get a single inventory item by ID
// @access  Public (or you can add auth middleware)
router.get("/:id", async (req, res) => {
  try {
    const item = await InventoryItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found." });
    res.json(item);
  } catch (err) {
    console.error("Error fetching inventory item:", err);
    res.status(500).json({ message: "Server error fetching inventory item." });
  }
});

// @route   PUT /api/inventory/:id
// @desc    Update an existing inventory item
// @access  Public (or you can add auth middleware)
router.put("/:id", async (req, res) => {
  const { name, type, quantity, price, status } = req.body;

  try {
    const updated = await InventoryItem.findByIdAndUpdate(
      req.params.id,
      { name, type, quantity, price, status },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: "Item not found." });
    res.json(updated);
  } catch (err) {
    console.error("Error updating inventory item:", err);
    res.status(500).json({ message: "Server error updating inventory item." });
  }
});

// @route   DELETE /api/inventory/:id
// @desc    Delete an inventory item
// @access  Public (or you can add auth middleware)
router.delete("/:id", async (req, res) => {
  try {
    const removed = await InventoryItem.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ message: "Item not found." });
    res.json({ message: "Item deleted successfully." });
  } catch (err) {
    console.error("Error deleting inventory item:", err);
    res.status(500).json({ message: "Server error deleting inventory item." });
  }
});

module.exports = router;
