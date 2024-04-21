const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Base schema for donation details
const donationDetailsSchema = new Schema({
    // type: String, // 'supply' or 'monetary'
    amount: Number,
    paymentType: String, // 'cash' or 'bank'
    accountNumber: String,
    accountName: String
});

// // Create a discriminator for supply donation details
// const supplyDetailsSchema = new Schema({
//     supplyType: String,
//     dropLocation: String
// });

// // Create a discriminator for monetary donation details
// const monetaryDetailsSchema = new Schema({
//     paymentType: String, // 'cash' or 'bank'
//     accountNumber: String,
//     accountName: String
//     // transactionId: String
// });

// Create the main donation schema
const donationSchema = new Schema({
    donor: {
        type: mongoose.SchemaTypes.Mixed,
        ref: "User",
    },
    donation: {
        type: donationDetailsSchema,
        required: true,
    },
    phoneNumber: Number
}, { timestamps: true });

// Create the Donation model
const Donation = mongoose.model('Donation', donationSchema);

// // Add discriminators to the donationDetailsSchema
// donationSchema.path('donation').discriminator('supply', supplyDetailsSchema);
// donationSchema.path('donation').discriminator('monetary', monetaryDetailsSchema);

module.exports = Donation;