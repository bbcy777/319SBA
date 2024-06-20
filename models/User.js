const mongoose = require('mongoose');
const Cart = require('./Cart');
const Product = require('./Product');

const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
    zip: Number,
    country: {
        type: String,
        default: 'US'
    }
});

const userSchema = new mongoose.Schema({
    name: String,
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    itemForSell: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    address: addressSchema,
    userType: {
        type: String,
        enum: ['buyer', 'seller'],
        default: 'buyer'
    },
    createAt: {
        type: Date,
        default: ()=> Date.now(),
    }
});

module.exports = mongoose.model('User', userSchema);