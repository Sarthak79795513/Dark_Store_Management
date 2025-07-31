const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/darkstore";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully."))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });

// --------------------- ROUTES ---------------------

// Auth Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Inventory Routes
const inventoryRoutes = require("./routes/inventoryRoutes");
app.use("/api/inventory", inventoryRoutes);

// Order Routes
const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);

// Logistics (Optional - if different from orders)
const logisticsRoutes = require("./routes/logisticsRoutes"); // Rename if needed
app.use("/api/logistics", logisticsRoutes);

// In your Express backend (routes/orders.js or server.js)
app.get("/api/orders/process-order", (req, res) => {
  
});

const dashboardRoutes = require('./routes/dashboardRoutes');

app.use(express.json());
app.use('/api', dashboardRoutes);


const predictRoutes = require('./routes/stockRoutes');

app.use('/api', predictRoutes);
// --------------------- SERVER START ---------------------

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
