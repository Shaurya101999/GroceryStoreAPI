const express = require('express');
const router = express.Router();

router.get('/', (req, res) =>{
  res.send('Hello World!');
});

router.use('/products', require('./products'));
router.use('/customers', require('./customer'));
router.use('/order', require('./order'));

module.exports = router;