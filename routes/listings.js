const express = require('express');
const Product = require('../models/Product.js');
const User = require('../models/Cart.js');
const Buyer = require('../models/User.js');
const router = express.Router();

router.get('/', async(req, res, next)=> {
    try {
        const user = await User.findById(req.user._id).populate('itemsForSale');
        if(!user) {
            return res.status(404).json({message: 'User not found'});
        }
        if (user.userType !== 'seller') {
            return res.status(403).json({message: 'User is not authorized as a seller'});
        }
        res.json(user.itemsForSale);
    } catch (err) {
        next(err);
    }
});

module.exports = router