const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const straySchema = new Schema({
    imgData: {
        type: String,
        required: true
    },
    imgSrc: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true

    },
    breed: {
        type: String,
        required: true
    },
    color: {
        type: String, 
        required: true
    },
    size: {
        type: Number, 
        required: true
    },
    temperament: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    spayedNeutered: {
        type: String, 
        enum: ['Yes', 'No'],
        required: true 
    },
    vaccinated: {
        type: String, 
        enum: ['Yes', 'No'],
        required: true 
    },
    gender:{
        type: String,
        required: true
    },
    animal: {
        type: String,
        required: true

    },
    surrenderDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    story: {
        type: String,
        required: true
    },
    uploader: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    validator: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
    }
}, { timestamps: true });

straySchema.statics.findApprovedStrays = async function() {
    const strays = await this.find({ status: { $ne: "pending" } });
    return strays;
}

straySchema.statics.findUploadedStrays = async function(userId) {
    const strays = await this.where("uploader").equals(`${userId}`);
    return strays;
}

straySchema.statics.findPendingStrays = async function() {
    const strays = await this.where("status").equals("pending").populate("uploader");
    return strays;
}

const Stray = mongoose.model('Stray', straySchema);
module.exports = Stray;