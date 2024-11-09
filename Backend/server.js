// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // CORS should be correctly imported
const cartRoutes = require('./routes/cart');

const app = express();
const port = 5000;

// Enable CORS for the frontend (adjust if necessary)
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Middleware to parse JSON data
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Cdata', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Failed to connect to MongoDB:', error));

// Use the cart routes
app.use('/api/cart', cartRoutes);

// Example endpoint to add product to wishlist
app.put('/user/addToWishlist', async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id; // Assuming you're using JWT for authentication
    
    try {
      // Find the user and add productId to the wishlist
      const user = await User.findById(userId);
      user.wishlist.push(productId);
      await user.save();
      
      res.status(200).json({ message: 'Product added to wishlist' });
    } catch (error) {
      res.status(500).json({ error: 'Error adding product to wishlist' });
    }
  });
  

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
