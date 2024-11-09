const mongoose = require('mongoose');
const CartItem = require('./CartItem'); // Import the CartItem schema

// Cart schema
const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },  // Reference to the product
    quantity: { type: Number, required: true, default: 1 },
    // You can embed CartItem schema details for each product if needed
    name: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String },
    category: { type: String },
    overAllRating: { type: Number },
    discount: { type: Number },
  }],
  createdAt: { type: Date, default: Date.now },
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
