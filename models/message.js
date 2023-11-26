const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    title: {
        type: String,
        
    },
    body: {
        type: String,
        required: true
    },
    sender:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    receiver:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;