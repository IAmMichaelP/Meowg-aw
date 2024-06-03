const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Base schema for cart content details
const purchaseContentSchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    merch: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Merch",
        required: true
    },
    status: {
        type: String,
        enum: ['pending approval', 'to be shipped', 'shipped', 'to be received', 'to rate', 'cancelled'],
        required: true,
        default: 'pending approval'
    }
});

// Main cart schema
const purchaseSchema = new Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    
    purchase: [purchaseContentSchema] // Changed to an array of cartContentSchema
}, { timestamps: true });

// Static method to find cart content for a user
purchaseSchema.statics.findPurchase = async function(user) {
    try {
        const purchases = await this.where("user").equals(`${user}`).populate({
            path: 'purchase.merch',
            strictPopulate: false // Add this if the path is not found
        });
        console.log(purchases);
        return purchases;
    } catch (error) {
        console.error("Error finding purchase content:", error);
        throw error;
    }
}

const Purchase = mongoose.model('Purchase', purchaseSchema);
module.exports = Purchase;
