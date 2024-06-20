const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 2000;
const express = require('express');
const app = express();

const connectDB = require('./db/conn')
connectDB();

app.use(express.json());

const sellerRoute = require('./routes/Seller');
app.use('/sellers', sellerRoute)

const listingRoute = require('./routes/listings');
app.use('/listings', listingRoute);

app.listen(PORT, () => {
    console.log(`Server is connected to port: ${PORT}`);
});