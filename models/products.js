const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
  productName: { 
    type: String, 
    required: true,
    unique: true,
  }, 
  productCategory:{
    type: String,
    required: true
  },
  productInfo: {
    type: String,
  },
  price:{
    type: Number,
    required: true
  },
  quantityAvailable: {
    type: Number,
    required: true
  },
}, {
  timestamps: true
})

const Products = mongoose.model('Products', productSchema);
module.exports = Products;