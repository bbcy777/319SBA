const mongoose = require('mongoose');
const addressSchema = require('./Address');
const Product = require('./Product');

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
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    address: addressSchema,
    userType: String,
    createAt: {
        type: Date,
        default: ()=> Date.now(),
    }
});

module.exports = mongoose.model('User', userSchema);