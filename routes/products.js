const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

router.get('/', async(req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
});

router.post('')

module.exports = router;