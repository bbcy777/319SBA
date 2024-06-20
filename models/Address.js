const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
    zip: Number,
    country: {
        type: String,
        default: 'US'
    }
}) 

module.exports = addressSchema;