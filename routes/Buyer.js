const express = require('express');
const db = require('../db/conn.js');
const Product = require('../models/Product.js');
const Cart = require('../models/Cart');
const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        let id;
        try {
            id = new ObjectId(req.params.id);
        } catch (err) {
            res.status(400).send('ObjectId is not valid');
            return;
        }
        let collection = await db.collection('test319db');
        let result = await collection.findOne({ _id: id});

        if(!result) {
            throw error('User Not Found', 404);
        } else {
            res.status(200).json(result);
        }
    } catch (err) {
        res.status(err.status).send(err.message);
    }
});

router.post

router.get('/:id/cart', async (req, res) => {
    try {
        const userId = req.params.id;
        const cart = await Cart.findOne({ user: userId}).populate('item.product');
        return cart ? cart.items: []
    } catch (err) {
        console.error('Error getting cart items: ', err);
    }
})

router.delete('/:id/cart', async (req, res) => {
    try {
        const userId = req.params.id;
        await Cart.deleteOne({
            cart.user: userId
        })
    } catch (err) {
        res.status(err.status).send(err.message)
    }
})
module.exports = router;