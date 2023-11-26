const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    uploader:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    imgData: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;