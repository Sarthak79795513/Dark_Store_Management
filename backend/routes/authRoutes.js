const express = require('express');
const router = express.Router();

// Import controller functions
const { register, login } = require('../controllers/authController');

// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', register);

// @route   POST /api/auth/login
// @desc    Login a user
router.post('/login', login);

module.exports = router;
