const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 2000;
const express = require('express');
const app = express();

const connectDB = require('./db/conn')
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    const time = new Date();
  
    console.log(
      `-----
  ${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
    );
    if (Object.keys(req.body).length > 0) {
      console.log('Containing the data:');
      console.log(`${JSON.stringify(req.body)}`);
    }
    next();
  });
// const sellerRoute = require('./routes/User');
// app.use('/sellers', sellerRoute)

const listingRoute = require('./routes/listings');
app.use('/listings', listingRoute);

const productRoute = require('./routes/products');
app.use('/product', productRoute)

const userRoute = require('./routes/Buyer');
app.use('/users', userRoute);

app.listen(PORT, () => {
    console.log(`Server is connected to port: ${PORT}`);
});