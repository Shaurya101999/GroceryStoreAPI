const express = require('express');
const app = express();
const port = process.env.PORT || 8000 ;
const db = require('./config/mongoose');
require('dotenv').config();

app.use(express.json());
app.use('/', require('./routes'));

app.listen(port , (err)=>{
  if (err){ 
    console.log(`Error listening on port ${port}`);
    return ;
  }
  console.log(`Express server listening on port ${port}`);
})