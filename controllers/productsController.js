const Products = require('../models/products');

const getProducts = async (req, res) => {
  try {
    const products = await Products.find({});
    return res.status(200).json({'msg': 'All products', products});
  } catch (error) {
    return res.sendStatus(500);
  }
  
}

const createProduct = async(req, res) => {
  try {
    const {productName, productCategory, productInfo, price, quantityAvailable} = req.body;
    
    // check if required fields are present
    if (!productName || !productCategory || !price || !quantityAvailable || NaN(price) || NaN(quantityAvailable)) {
      return res.status(400).json({'message': 'Please provide all data in right format'})
    }

    // check if product is already available
    const productExists = await Products.findOne({productName});
    if (productExists) {
      console.log(productExists);
      return res.status(400).json({'message': 'Product already exists'})
    } 

    const product =await Products.create({productName, productCategory, productInfo, price, quantityAvailable})
    return res.status(201).json({'message': 'Product added successfully', product})
  } catch (error) {
    return res.sendStatus(500);
  }
  
}

const updateProduct = async (req, res) => {
  try {
    // check required fields and their format
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
  } catch (error) {
    return res.sendStatus(500);
  }
 
}

module.exports = {getProducts, createProduct, updateProduct}