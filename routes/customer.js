const express = require('express');
const router = express.Router();
const {getAllCustomers, getCustomerWithMaxOrders, addCustomer, getCustomerOrders} = require('../controllers/customerController');

// get all customers
router.get('/', getAllCustomers);

// add a customer to the customer list
router.post('/', addCustomer);

// specific customer all orders
router.get('/orders', getCustomerOrders);

// get customer with max orders
router.get('/maxOrder', getCustomerWithMaxOrders);

module.exports = router;