const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
  productCategory:{
    type: String,
    required: true
  },
  productInfo: {
    type: String,
    required: true
  },
  price:{
    type: Number,
    required: true
  },
  quantityAvailable: {
    type: Number,
    required: true
  },
})

const Customers = mongoose.model('Customers', CustomersSchema);
module.exports = Customers;