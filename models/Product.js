const mongoose = require('mongoose');

const productSchema = new mongoose.Schema ({
    name: {
        type: String,
        lowercase: true,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    seller: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true,
    },
    category: {
        type: String,
        lowercase: true,
    }
});

const Product = mongoose.model('Product',productSchema);
module.exports = Product;