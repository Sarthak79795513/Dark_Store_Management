const express = require('express');
const router = express.Router();
const { predictStock } = require('../controllers/stockController');

router.post('/predict', predictStock);

module.exports = router;
