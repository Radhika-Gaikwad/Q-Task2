const express = require('express');
const CartItem = require('../models/cartItem'); // Import CartItem model
const router = express.Router();

// Fetch all cart items
router.get('/', async (req, res) => {
    try {
        const cartItems = await CartItem.find();
        res.status(200).json(cartItems); // Return cart items in the response
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ message: 'Error fetching cart items' });
    }
});

// Add a new cart item
router.post('/', async (req, res) => {
    const { name, price, quantity, imageUrl } = req.body;

    // Create a new cart item
    const newCartItem = new CartItem({
        name,
        price,
        quantity,
        imageUrl,
    });

    try {
        await newCartItem.save(); // Save the new cart item in the database
        res.status(201).json({ message: 'Product added to cart' });
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).json({ message: 'Error adding product to cart' });
    }
});

// Remove a cart item by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params; // Get the product ID from URL params

    try {
        await CartItem.findByIdAndDelete(id); // Delete the cart item from the database
        res.status(200).json({ message: 'Product removed from cart' });
    } catch (error) {
        console.error('Error removing product from cart:', error);
        res.status(500).json({ message: 'Error removing product from cart' });
    }
});

module.exports = router; // Export the router for use in the main server
