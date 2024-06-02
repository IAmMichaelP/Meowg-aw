const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Base schema for cart content details
const checkoutContentSchema = new Schema({
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
const checkoutSchema = new Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    checkout: [checkoutContentSchema] // Changed to an array of cartContentSchema
}, { timestamps: true });

// Static method to find cart content for a user
checkoutSchema.statics.findCheckout = async function(user) {
    try {
        const checkout = await this.findOne({ user: user }).populate('checkout.merch');
        return checkout;
    } catch (error) {
        console.error("Error finding checkout content:", error);
        throw error;
    }
}

const Checkout = mongoose.model('Checkout', checkoutSchema);
module.exports = Checkout;
