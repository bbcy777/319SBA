const express = require('express');
const Product = require('../models/Product.js');
const Cart = require('../models/Cart.js');
const Buyer = require('../models/User.js');
const router = express.Router();

router.get('/', async(req, res)=> {
    try {
        const carts = await Cart.find();
        if(!carts) {
            return res.status(404).json({message: 'Carts are not found'});
        }
        res.json(carts);
    } catch (err) {
        res.status(500).json({error: 'Server Error'});
    }
});

router.post('/', async (req, res) => {
    try{
        const newDoc = req.body;
        if (newDoc.user) {
            const checkCart = await Cart.findOne({user: newDoc.user});
            if (checkCart) {
                return res.status(404).json({error: 'Cart already exist'});
            }
        }
        const newCart = await Cart.create(newDoc);
        res.status(201).json(newCart);
    } catch (err) {
        res.status(500).json({error: 'Server Error'})
    }
})

module.exports = router