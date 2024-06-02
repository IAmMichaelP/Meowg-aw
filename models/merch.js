const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const merchSchema = new Schema({
    imgData: {
        type: String,
        required: true
    },
    uploader:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    name:{
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
    category: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true });

// the parameter user is an object id of a specific user
merchSchema.statics.findUserMerch = async function(user) {
    const merch = await this.find({ user: user });
    return merch;
}

merchSchema.statics.findMerch = async function(id) {
    const merch = await this.find({ _id: id });
    return merch;
}

merchSchema.statics.findAllMerch = async function() {
    const merch = await this.find();
    return merch;
}

const Merch = mongoose.model('Merch', merchSchema);
module.exports = Merch;