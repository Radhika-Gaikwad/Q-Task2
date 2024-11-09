const mongoose = require('mongoose');

// Cart Item Schema definition
const cartItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});

// CartItem Model based on the schema
const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;

