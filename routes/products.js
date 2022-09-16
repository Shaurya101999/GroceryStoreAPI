const express = require('express');
const router = express.Router();
const Products = require('../models/products')

// get all products
router.get('/', async (req, res) => {
  const products = await Products.find({});
  return res.status(200).json({'msg': 'All products', products});
});

// create a new product
router.post('/', async(req, res) => {

  const {productName, productCategory, productInfo, price, quantityAvailable} = req.body;
  if (!productName || !productCategory || !price || !quantityAvailable) {
    return res.status(400).json({'message': 'Please provide all data'})
  }
  const productExists = await Products.findOne({productName});
  if (productExists) {
    console.log(productExists);
    return res.status(400).json({'message': 'Product already exists'})
  } 

  const product =await Products.create({productName, productCategory, productInfo, price, quantityAvailable})
  return res.status(201).json({'message': 'Product added successfully', product})
});

// update an existing product
router.put('/price', async (req, res) => {
  const {product, price } = req.body;
  if (!product || !price || isNaN(price)){
    return res.status(400).json({'message': 'Please enter a valid product and price'})
  }
  const updatedProduct = await Products.updateOne({
    productName:product
    },{
    $set: { price: price }
  })
  if(!updatedProduct){
    return res.status(401).json({
      message: 'Product Not found'
    })
  }

  return res.status(200).json({
    updatedPrice: price,
    message: 'Price updated successfully',
  });
})

module.exports = router;
