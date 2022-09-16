const mongoose = require('mongoose');

const orderedProductSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  quantity: {
      type: Number,
      required: true
  },
  price: {
      type: Number,
      required: true
  },
});

const orderSchema = new mongoose.Schema({
    productList: [orderedProductSchema],

    totalPrice: {
        type: Number,
    },

    paymentType: {
        type: "String",
        enum: ["Upi", "Cash", "Internet-Banking"]
    }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;