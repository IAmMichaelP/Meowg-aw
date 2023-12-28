const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    // title: {
    //     type: String,
    // },
    // sender:{
    //     type: mongoose.SchemaTypes.ObjectId,
    //     ref: "User",
    //     required: true
    // },
    // receiver:{
    //     type: mongoose.SchemaTypes.ObjectId,
    //     ref: "User",
    //     required: true
    // },
    senderEmail: {
        type: String,
        required: true
    },
    senderName: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;