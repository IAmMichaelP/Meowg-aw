const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true

    }, 
    profilePicture: {
        type: String,
    }, 
    name: {
        type: String,
        required: true
    }
}, { timestamps: true });

// static method to login user
userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email');
};

userSchema.statics.uploadPic = async function(id, picture) {
    const user = await this.findById(id);
    if(user) {
        try {
            user.profilePicture = picture;
        } catch (e) {
            throw Error('picture upload failed');
        }
    }
    throw Error('user not found');
}

const User = mongoose.model('User', userSchema);
module.exports = User;