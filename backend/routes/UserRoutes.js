const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Assuming you have a User model defined in models/User.js

// Register a user
router.post("/register", async (req, res) => {
  const { username, role, password } = req.body;

  if (!username || !role || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newUser = new User({ username, role, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
});

// Login (for future)
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: "Server error.", error: err.message });
  }
});

module.exports = router;
