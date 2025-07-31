// controllers/inventoryController.js
const Inventory = require('../models/Inventory');

// GET: All inventory items
exports.getAllInventory = async (req, res) => {
  try {
    const items = await Inventory.find();
    res.status(200).json(items);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching inventory', error: error.message });
  }
};

// POST: Add inventory item
exports.addInventory = async (req, res) => {
  const { itemName, category, quantity, price } = req.body;
  if (!itemName || !category || quantity == null || price == null) {
    return res.status(400).json({ message: 'All fields are required.' });
  }
  try {
    const newItem = new Inventory({ itemName, category, quantity, price });
    const savedItem = await newItem.save();
    res.status(201).json({ message: 'Item added', item: savedItem });
  } catch (error) {
    res.status(500).json({ message: 'Error adding item', error: error.message });
  }
};

// PUT: Update inventory item
exports.updateInventory = async (req, res) => {
  const { id } = req.params;
  const { itemName, category, quantity, price } = req.body;
  try {
    const updated = await Inventory.findByIdAndUpdate(
      id,
      { itemName, category, quantity, price },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Item not found.' });
    res.status(200).json({ message: 'Item updated', item: updated });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating item', error: error.message });
  }
};

// DELETE: Remove inventory item
exports.deleteInventory = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Inventory.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Item not found.' });
    res.status(200).json({ message: 'Item deleted' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting item', error: error.message });
  }
};
