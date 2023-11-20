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
    faveColor:{
        type: String,
        required: true
    },
    birthplace: {
        type: String,
        required: true
    }
}, { timestamps: true });

// static method to login user
userSchema.statics.login = async function(email, password, faveColor, birthplace) {
    const user = await this.findOne({ email });
    console.log(user);
    if (user) {
        if (faveColor == user.faveColor) {
            if (birthplace == user.birthplace) {
                const auth = await bcrypt.compare(password, user.password);
                if (auth) {
                    return user;
                }
                throw Error('incorrect password');
            }
            throw Error('incorrect birthplace');
        }
        throw Error('incorrect favorite color');
        
    }
    throw Error('incorrect email');
};

const User = mongoose.model('User', userSchema);
module.exports = User;