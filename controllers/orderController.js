const Order = require('../models/orders');
const Products = require('../models/products');
const Customers = require('../models/customer');

const createOrder = async (req, res) => {
  try {
    const { email, phone, products, paymentType} = req.body;

    // check if all required fields are present
    if ((!email || !phone) && !products && !paymentType) {
      return res.status(400).json({ message: 'Please enter email/phone, product and payment type' });
    }

    // find user by phone number
    const customer = await Customers.findOne({'phone': phone})
    
    if (!customer) {
      return res.status(400).json({ message: 'Customer not found, please register this customer' });
    }

    /* 
    iterate through products and finde if they exists in products collection
    if yes then add them to order and calculate their price and total and store in order collectiom
    else return
    */
    let order ,orderedProducts =[],totalPrice = 0;
    for(const product of products) {
      let ifProductPresent = await Products.findOne({ productName: product.name})
      if (!ifProductPresent) {
        return res.status(400).json({ 'message': `${product} Product not found` });
      }
      if(Number(product.quantity)> Number(ifProductPresent.quantityAvailable)){
        return res.status(400).json({ 'message': `Available ${product.name} quantity is ${ifProductPresent.quantityAvailable}` });
      }
      const remainingStock = Number(ifProductPresent.quantityAvailable) - Number(product.quantity);
      ifProductPresent= await Products.findOneAndUpdate(
        {productName: product.name}, 
        {quantityAvailable: remainingStock}
      )
      const {productName, price} = ifProductPresent;
      const singleProduct = {
        name: productName,
        price,
        quantity: product.quantity
      }
      orderedProducts.push(singleProduct);
      totalPrice += Number(product.quantity) * price ;

    }
    order = await Order.create({
      productList: orderedProducts,
      totalPrice,
      paymentType
    })
    
    await customer.orders.push(order);
    await customer.save();
  

    return res.status(200).json({
      message: 'Order placed ',
      orderPlaced: order
    })
    
  }catch (err) {
    return res.status(500).json({
      'error': err.message,
      message: "Internal server error"
    })
  }
}
module.exports = createOrder;