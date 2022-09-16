const express = require('express');
const router = express.Router();
const createOrder = require('../controllers/orderController');

// create order
router.post('/', createOrder);

module.exports = router;