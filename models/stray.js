const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    }
}, { timestamps: true });

const Stray = mongoose.model('Stray', straySchema);
module.exports = Stray;