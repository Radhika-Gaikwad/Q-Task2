
const CartItem = require('../models/CartItem');

exports.addToCart = async (req, res) => {
    const { name, quantity, price, imageUrl, category, overAllRating, discount } = req.body;

    // Log incoming data for debugging purposes
    console.log("Received data in addToCart:", req.body);

    try {
        const newItem = new CartItem({ 
            name, 
            quantity, 
            price, 
            imageUrl, 
            category, 
            overAllRating, 
            discount 
        });

        // Save the item to the database
        const savedItem = await newItem.save();
        
        // Log the saved item to ensure it's being saved properly
        console.log("Saved item:", savedItem);

        // Send the full item in the response
        res.status(201).json({
            message: 'Item added to cart successfully!',
            item: savedItem  // Return the saved item including all fields
        });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ message: 'Failed to add item to cart' });
    }
};
