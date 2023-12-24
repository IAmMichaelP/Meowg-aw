const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Base schema for donation details
const donationDetailsSchema = new Schema({
    type: String, // 'supply' or 'monetary'
    amount: Number,
});

// Create a discriminator for supply donation details
const supplyDetailsSchema = new Schema({
    supplyType: String,
    dropLocation: String
});

// Create a discriminator for monetary donation details
const monetaryDetailsSchema = new Schema({
    paymentType: String, // 'cash' or 'bank'
    accountId: String,
    transactionId: String
});

// Create the main donation schema
const donationSchema = new Schema({
donor: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
},
donation: {
    type: donationDetailsSchema,
    required: true,
},
}, { timestamps: true });

// Create the Donation model
const Donation = mongoose.model('Donation', donationSchema);

// Add discriminators to the donationDetailsSchema
donationDetailsSchema.discriminator('supply', supplyDetailsSchema);
donationDetailsSchema.discriminator('monetary', monetaryDetailsSchema);

module.exports = Donation;