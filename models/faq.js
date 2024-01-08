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
    },
    
}, { timestamps: true });

faqSchema.statics.findPendingFaqs = async function() {
    const faqs = await this.find({ status: { $eq: "pending" } }).populate("uploader");
    return faqs;
}

faqSchema.statics.findApprovedFaqs = async function() {
    const faqs = await this.find({ status: { $eq: "approved" } }).populate("uploader");
    return faqs;
}

const Faq = mongoose.model('Faq', faqSchema);
module.exports = Faq;