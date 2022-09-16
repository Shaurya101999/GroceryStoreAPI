const mongoose = require('mongoose');
const dburl = 'mongodb+srv://shaurya:Varma1999@grocery.ctg76xn.mongodb.net/?retryWrites=true&w=majority'
// const dburl = 'mongodb://localhost/ecommerce_development'

mongoose.connect(dburl)

const db = mongoose.connection ;

db.on('error', console.error.bind(console, 'Error in connecting to db'));

db.once('open', function(){
    console.log('Connected to MongoDB')
});

module.exports = db ;