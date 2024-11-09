
const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: false },  // Optional
  category: { type: String, required: false },  // Optional
  overAllRating: { type: Number, required: false },  // Optional
  discount: { type: Number, required: false },  // Optional
}, { timestamps: true });  // Adding timestamps for better tracking

module.exports = mongoose.model('CartItem', CartItemSchema);

