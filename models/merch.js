const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const merchSchema = new Schema({
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
    type: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    size: {
        type: String
    }
}, { timestamps: true });

// the parameter user is an object id of a specific user
merchSchema.statics.findMerch = async function(user) {
    const merch = await this.find({ user: user });

    return merch;
}

const Merch = mongoose.model('Merch', merchSchema);
module.exports = Merch;