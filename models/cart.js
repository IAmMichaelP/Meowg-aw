const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Base schema for cart content details
const cartContentSchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    merch: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Merch",
        required: true
    }
});

// Main cart schema
const cartSchema = new Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    cart: [cartContentSchema] // Changed to an array of cartContentSchema
}, { timestamps: true });

// Static method to find cart content for a user
cartSchema.statics.findCartContent = async function(user) {
    try {
        const cart = await this.findOne({ user: user }).populate('cart.merch');
        return cart;
    } catch (error) {
        console.error("Error finding cart content:", error);
        throw error;
    }
}

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
