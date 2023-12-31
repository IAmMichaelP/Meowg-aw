const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const faqSchema = new Schema({
    uploader:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    question:{
        type: String,
        required: true
    },
    answer:{
        type: String,
        required: true
    }
}, { timestamps: true });

const Faq = mongoose.model('Faq', faqSchema);
module.exports = Faq;