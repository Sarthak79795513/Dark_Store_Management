const store = require('../data/storeData');

// GET inventory count
const getInventory = (req, res) => {
  const totalCount = store.items.reduce((sum, item) => sum + item.quantity, 0);
  res.json({ 
    inventoryCount: totalCount,
    items: store.items
  });
};

// POST to restock inventory
const restockInventory = (req, res) => {
  const { restockAmount } = req.body;
  const amount = Number(restockAmount) || 0;

  // Example: evenly distribute restock across items
  const perItem = Math.floor(amount / store.items.length);
  store.items = store.items.map(item => ({
    ...item,
    quantity: item.quantity + perItem
  }));

  const totalCount = store.items.reduce((sum, item) => sum + item.quantity, 0);
  res.json({ newInventoryCount: totalCount });
};

// GET pending orders
const getPendingOrders = (req, res) => {
  res.json({ pendingOrders: store.pendingOrders });
};

// POST to process an order
const processOrder = (req, res) => {
  const totalInventory = store.items.reduce((sum, item) => sum + item.quantity, 0);

  if (store.pendingOrders > 0 && totalInventory > 0) {
    store.pendingOrders--;

    // Remove 1 quantity from the first item with quantity > 0
    for (let item of store.items) {
      if (item.quantity > 0) {
        item.quantity--;
        break;
      }
    }
  }

  const newTotalInventory = store.items.reduce((sum, item) => sum + item.quantity, 0);

  res.json({
    newPendingOrders: store.pendingOrders,
    newInventoryCount: newTotalInventory
  });
};

module.exports = {
  getInventory,
  restockInventory,
  getPendingOrders,
  processOrder
};
