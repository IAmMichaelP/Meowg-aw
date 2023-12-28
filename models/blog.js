const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    uploader:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    
    // imgData: {
    //     type: String,
    //     required: true
    // }
}, { timestamps: true });

blogSchema.statics.findPendingBlogs = async function() {
    const blogs = await this.find({ status: { $eq: "pending" } });
    return blogs;
}

blogSchema.statics.findUserBlogs = async function(user) {
    const blogs = await this.find({ uploader: { $eq: user } });
    return blogs;
}

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;