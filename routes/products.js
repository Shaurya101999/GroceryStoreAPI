const express = require('express');
const router = express.Router();
const {getProducts, createProduct, updateProduct} = require('../controllers/productsController');
// get all products
router.get('/', getProducts);

// create a new product
router.post('/', createProduct);

// update an existing product
router.put('/price', updateProduct);

module.exports = router;
