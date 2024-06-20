const mongoose = require('mongoose');

const productSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
    },
    category: String
});

module.exports = ('Product',productSchema);