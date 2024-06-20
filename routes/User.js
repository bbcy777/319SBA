const express = require('express');
const Product = require('../models/Product.js');
const User = require('../models/User.js');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        let collection = await db.collection('test319db');
        let newDocument = req.body;
        if ( newDocument.userName) {
            throw new Error ('User name already exist. Please choose a different one.')
        }
        const user = await User.create(newDocument);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).send(error);
    }
}) 

module.exports = router;