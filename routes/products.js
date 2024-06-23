const express = require('express');
const Product = require('../models/Product');
const { default: mongoose } = require('mongoose');
const router = express.Router();

router.get('/', async(req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
});

router.post('/', async(req, res) => {
    try {
        const newItem = req.body;
        if (newItem.name) {
            const item = await Product.findOne({name: newItem.name});
            if (item) {
                return res.status(404).json({error: 'This product already exist'})
            }
        }
        const product = await Product.create(newItem);
        res.status(200).json(product);
    } catch(err) {
        res.status(500).json('Internel server error');
    }
});

router.get('/:id', async (req, res) => {
    try{
        const productId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(productId)){
            return res.status(400).json({error: 'Invalid product ID'})
        }
        const item = await Product.findById(productId);
        if (!item) {
            return res.status(404).json({error: `Item doesn't exist`});
        }
        res.status(200).json(item);
    } catch(err) {
        res.status(500).send({error: 'Server Error'});
    }
})

router.put('/:id', async (req, res) => {
    try{
        const productId = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(productId)){
            return res.status(400).json({error: 'Invalid product ID'})
        };
        const newDocument = req.body
        const itemUpdate = await Product.findByIdAndUpdate(productId,newDocument, {new: true, runValidators: true});
        if (!itemUpdate) {
            return res.status(404).json({error: `Item doesn't exist`});
        };
        res.status(200).json(itemUpdate);
    } catch(err) {
        res.status(500).send({error: 'Server Error'})
    }
})

router.delete('/:id', async (req, res) =>{
    try{
        const productId = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({error: 'Invalid product ID'});
        };
        const deleteProduct = await Product.findByIdAndDelete(productId);
        if (!deleteProduct) {
            return res.status(404).json({error: `Item doesn't exist`});
        };
        res.status(200).json({'Item deleted: ': deleteProduct});
    } catch (err) {
        res.status(500).send({error: 'Server error'})
    }
});
module.exports = router;