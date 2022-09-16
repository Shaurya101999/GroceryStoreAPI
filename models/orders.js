const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
  productList:{
      type: String,
      required: true
  },
  totalPrice:{
      type: Number,
      required: true
  },
  paymentInfo: {}
})

const Customers = mongoose.model('Customers', CustomersSchema);
module.exports = Customers;