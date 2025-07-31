// Delivery Schema
const deliverySchema = new mongoose.Schema({
  deliveryId: String,
  orderId: String,
  address: String,
  status: { type: String, default: "pending" },
  deliveryDate: Date
});

const Delivery = mongoose.model('Delivery', deliverySchema);

// Order Schema (To simulate Order Confirmation)
const orderSchema = new mongoose.Schema({
  orderId: String,
  status: { type: String, default: "pending" }, // "pending", "confirmed", "cancelled"
});

const Order = mongoose.model('Order', orderSchema);

// Route to fetch all deliveries
app.get('/api/logistics', async (req, res) => {
  try {
    const deliveries = await Delivery.find();
    res.json(deliveries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to create new delivery after confirming the order
app.post('/api/logistics', async (req, res) => {
  const { deliveryId, orderId, address, status } = req.body;

  // Check if the order is confirmed before processing the delivery
  const order = await Order.findOne({ orderId });
  if (!order || order.status !== "confirmed") {
    return res.status(400).json({ message: "Order not confirmed. Cannot process delivery." });
  }

  // Create a new delivery record if order is confirmed
  const delivery = new Delivery({
    deliveryId,
    orderId,
    address,
    status: status || "pending",
    deliveryDate: new Date(),
  });

  try {
    await delivery.save();
    res.status(201).json(delivery);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to update the delivery status
app.patch('/api/logistics/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const delivery = await Delivery.findById(id);
    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }

    // Update the delivery status
    delivery.status = status;
    await delivery.save();
    res.json(delivery);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route to delete delivery record
app.delete('/api/logistics/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const delivery = await Delivery.findByIdAndDelete(id);
    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }
    res.json({ message: 'Delivery deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
