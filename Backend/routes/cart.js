const express = require('express');
const Cart = require('./models/Cart');
const Product = require('./models/Product');
const router = express.Router();

// Add product to cart
router.post('/addToCart', async (req, res) => {
  const { productId, quantity } = req.body; // The productId and quantity sent by the client
  const userId = req.user.id; // Assuming the user is authenticated and their ID is stored in `req.user.id`

  try {
    // Step 1: Check if the product exists in the product collection
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Step 2: Check if the cart already exists for the user
    let cart = await Cart.findOne({ userId });

    if (cart) {
      // If cart exists, update the product quantity or add the product if it's not in the cart
      const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

      if (existingItemIndex >= 0) {
        // If the item already exists, just update the quantity
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        // Add a new item to the cart
        cart.items.push({
          productId,
          quantity,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          category: product.category,
          overAllRating: product.overAllRating,
          discount: product.discount,
        });
      }

      await cart.save();
    } else {
      // If cart doesn't exist, create a new one with the first product
      cart = new Cart({
        userId,
        items: [{
          productId,
          quantity,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          category: product.category,
          overAllRating: product.overAllRating,
          discount: product.discount,
        }],
      });
      await cart.save();
    }

    res.status(200).json({ message: 'Product added to cart', cart });
  } catch (error) {
    console.error('Error adding product to cart:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;

