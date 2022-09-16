const Customers = require('../models/customer');
const Order = require('../models/orders')

const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customers.find({});
    return res.status(200).json({ customers });
  } catch (error) {
    return res.status(500).json({
      "message": "Internal Server Error",
      error: error
    })
  }
}

const addCustomer = async (req, res) => {
  try {
    const {name, email, phone} = req.body;
    console.log(req.body);
    if (!name || !email || !phone) {
      return res.status(400).json({ 'message': 'Name, email and phone are required' });
    }

    // check if customer already exists
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
  } catch (error) {
    return res.status(500).json({
      "message": "Internal Server Error",
      error: error
    })
  }
  
}

const getCustomerOrders = async (req, res) => {
  try{ 
    console.log(req.body);
    const {phone} = req.body;
    if(phone) {
      let customer = await Customers.findOne({phone: req.body.phone})
      customer= await customer.populate({ path: 'orders', model: Order })
        
      return res.status(200).json({
        'message': `Order list for ${customer.name} phone ${customer.phone}`,
        'OrderList': customer.orders
      })
    }else {
      return res.status(400).json({
          "message": "Please enter phone number"
      })
    }
  }catch(error){
    return res.status(500).json({
      "message": "Internal Server Error",
      error: error
    })
  }
}

const getCustomerWithMaxOrders = async (req, res) => {
  try {
    const customers = await Customers.find({});
    let customerWithMaxOrders, max = 0;

    if (customers.length == 0) {
      return res.status(200).json({
          message: 'No Customers Found',
      })
    }

    customers.forEach((customer) => {
        if (customer.orders.length > max && customer.orders.length > 0) {
            max = customer.orders.length;
            customerWithMaxOrders = customer;
        }
    });
    return res.status(200).json({'customer with max orders ': customerWithMaxOrders})
  } catch (error) {
    return res.status(500).json({
      "message": "Internal Server Error",
      error: error
    })
  }
  
}

module.exports = {getAllCustomers, getCustomerWithMaxOrders, addCustomer, getCustomerOrders}