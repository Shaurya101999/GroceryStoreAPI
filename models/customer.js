const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
  email:{
      type: String,
      required: true,
      unique: true,
  },
  phone:{
      type: Number,
      required: true
  },
  name:{
    type: String,
    required: true
  }

})

const Customers = mongoose.model('Customers', CustomersSchema);
module.exports = Customers;