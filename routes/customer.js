const express = require('express');
const Customers = require('../models/customer');
const Order = require('../models/orders')
const router = express.Router();


// get all customers
router.get('/', async (req, res) => {
  const customers = await Customers.find({});
  return res.status(200).json({ customers });
});

// add a customer to the customer list
router.post('/', async (req, res) => {
  const {name, email, phone} = req.body;
  console.log(req.body);
  if (!name || !email || !phone) {
    return res.status(400).json({ 'message': 'Name, email and phone are required' });
  }
  let customer = await Customers.findOne({
    $or: [{
        email: req.body.email
    }, {
        phone: req.body.phone
    }]
  });
  if(customer){
    return res.status(400).json({
      'message': 'Customer already exists'
    });
  }
  customer = await Customers.create({ name: name, email: email, phone: phone})
  return res.status(201).json({
    "message": 'Customer created successfully',
    customer
  })
});

// specific customer all orders
router.get('/orders', async (req, res) => {
  try{ 
    console.log(req.body);
    const {email, phone} = req.body;
    if(email || phone) {
      let customer = await Customers.findOne({
        $or: [{email: req.body.email}, 
          {phone: req.body.phone}]
        })
      customer= await customer.populate({ path: 'orders', model: Order })
        
      console.log('============',customer);
      return res.status(200).json({
        'message': `Order list for ${customer.name}(${customer.phone})`,
        'OrderList': customer.orders
      })
    }else {
      return res.status(400).json({
          "message": "Please enter all data"
      })
    }
  }catch(error){
    return res.status(500).json({
      "message": "Internal Server Error",
      error: error
    })
  }
});

// fetch customer with maximum number of orders in a year
router.get('/maxOrder', async (req, res) => {
  const customer = await Customers.findOne().sort({orders: -1 });
  if(!customer) {
    return res.status(200).json({
      message: 'No Customer Found',
    })
  }
  return res.status(200).json({'customer with max orders ': customer})
});


module.exports = router;