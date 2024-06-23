const express = require('express');
const db = require('../db/conn.js');
const Product = require('../models/Product.js');
const Cart = require('../models/Cart');
const User = require('../models/User.js');
const { default: mongoose } = require('mongoose');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json('Internal Server Error');
    }
})
//create new user
router.post('/', async (req, res) => {
    try {
        let newDocument = req.body;
        if ( newDocument.userName) {
            const existingUser = await User.findOne({ userName: newDocument.userName});
            if (existingUser) {
                return res.json('User name already exist. Please choose a different one.');
            }
        }
        const user = await User.create(newDocument);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

//show a specific user info(after a user login)
router.get('/:id', async (req, res) => {
    try {
        let id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({error: 'Invalid user ID'});
        };
        let result = await User.findById(id);
        if(!result) {
            return res.status(404).json({error: 'User Not Found'});
        } else {
            res.status(200).json(result);
        }
    } catch (err) {
        const status = err.status || 500;
        const message = err.message || 'Internal Server Error'
        res.status(status).send(message);
    }
});

//update one user's info
router.put('/:id', async (req, res) => {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'Invalid user ID'});
    };
    const {name, userName, email, address, userType} = req.body;
    try {
        const updateUser = await User.findByIdAndUpdate(userId, {
            name,
            userName,
            email,
            address,
            userType
        }, {new: true});
        if (!updateUser) {
            return res.status(404).json({error: 'User Not Found'})
        }
        res.status(200).json({message: 'User successfully updated'});

    } catch (err) {
        const status = err.status || 500;
        const message = err.message || 'Internal Server Error';
        res.status(status).send(message);
    }
});

//delete a user
router.delete('/:id', async (req, res) => {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'Invalid user ID'});
    };
    try {
        const deleteUser = await User.findByIdAndDelete(userId);
        if (!deleteUser) {
            return res.status(404).json({error: 'User Not Found'});
        }
        res.status(200).json({'User is deleted': deleteUser});
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
})

//get the user's cart
router.get('/:id/cart', async (req, res) => {
    try {
        const userId = req.params.id;
        const cart = await Cart.findOne({ user: userId}).populate('item.product');
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
});

//add item in the user's cart
// router.post('/:id/cart/add', async (req, res) =>{
//     const { productId, quantity } = req.body;

//     try {
//         const cart = await Cart.findOne({ user: req.params.id });
//         //check if user alreay has a cart, if not, create a new cart with empty item array
//         if(!cart) {
//             cart = new Cart({ user: req.params.id, items: [] })
//         }
//         //if user already has a cart, check if the product exists in the cart
//         const itemIndex = cart.items.findIndex(item => item.product.equals(productId));

//         if (itemIndex !== -1) {
//             //product already exists, update quantity
//             cart.items[itemIndex].quantity += quantity;
//         } else {
//             //product doesn't exist, add new item
//             cart.items.push({ product: productId, quantity });
//         }

//         await cart.save();
//         res.status(201).json(cart);

//     } catch (err) {
//         res.status(400).json({ message: err.message});
//     }
// });

//update quantity of a specific item in the cart
router.put('/:id/cart/update/:cartItemId', async(req, res) => {
    const cartItemId = req.params.cartItemId;
    const { quantity } = req.body;

    try {
        const cart = await Cart.findOne({ user: req.params.id});
        if (!cart) {
            return res.status(404).json({message: 'Cart not found'});
        }

        const itemToUpdate = cart.items.find(item => item.id.equals(cartItemId));

        if (!itemToUpdate) {
            return res.status(404).json({message: 'Item not found in cart.'})
        }

        itemToUpdate.quantity = quantity;

        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

//delete a specific item from the cart
router.delete('/:id/cart/:cartItemId', async (req, res) => {
    try {
        const userId = req.params.id;
        const cartItemId = req.params.cartItemId;

        const cart = await Cart.findOne({ userId: userId});

        if(!cart) {
            return res.status(404).json({ message: "Can't find the cart"});
        }

        cart.items = cart.items.filter((item) => !item._id.equals(cartItemId));
        await cart.save();

        res.json({message: 'Item removed from cart successfully', cart })
    } catch (err) {
        res.status(err.status).send(err.message)
    }
});

module.exports = router;