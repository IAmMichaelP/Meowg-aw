const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    user:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    stray:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Stray",
        required: true
    }
}, { timestamps: true });

// the parameter user is an object id of a specific user
blogSchema.statics.findFavorites = async function(user) {
    const favorites = await this.find({ user: user });

    // use this instead if you want to get all the values of each stray object
    // const favorites = await this.find({ user: userId }).populate("stray"); 

    return favorites;
}

const Favorite = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorite;