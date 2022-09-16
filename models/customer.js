const mongoose = require('mongoose');
const Orders = require('./orders');
const customerSchema = new mongoose.Schema({
  email:{
      type: String,
      required: true,
      unique: true,
  },
  phone:{
      type: Number,
      required: true,
      unique: true
  },
  name:{
    type: String,
    required: true
  },
  orders: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Orders'
  }]

})

const Customers = mongoose.model('Customers', customerSchema);
module.exports = Customers;