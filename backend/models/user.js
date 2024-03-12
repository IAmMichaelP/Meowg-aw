const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

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
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email'],
        required: true
    },
    password: {
        type: String,
        required: true

    }, 
    profilePicture: {
        type: String
    }, 
    name: {
        type: String
    },
    address: {
        type: String
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

userSchema.statics.uploadPic = async function(user, picture) {
    
    if(user) {
        try {
            if(user.profilePicture) {
                await User.findByIdAndUpdate(user._id, { $set: { profilePicture: picture } });
            } else {
                user.profilePicture = picture;
                await user.save();
            }
        } catch (e) {
            throw Error('picture upload failed');
        }
    }
    throw Error('user not found');
}

userSchema.statics.editProfile = async function (userData) {

    const update = await this.findByIdAndUpdate(userData.id, { 
        $set: { 
            profilePicture: userData.img,
            name: userData.name,
            email: userData.email,
            address: userData.address,
            email: userData.email
        }
    }, { runValidators: true, new: true })
    return update;
};



const User = mongoose.model('User', userSchema);
module.exports = User;