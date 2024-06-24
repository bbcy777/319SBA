const mongoose = require('mongoose');

const productSchema = new mongoose.Schema ({
    name: {
        type: String,
        lowercase: true,
        required: true,
    },//adding index so user can search product by name quckily
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        enum: ['Fruits', 'Vegetables', 'Dairy', 'Meat', 'Bakery', 'Pantry', 'Beverages', 'Snacks', 'Frozen Foods'],
        required: true
    },
});

productSchema.index({ name: 1 });

const Product = mongoose.model('Product',productSchema);
module.exports = Product;