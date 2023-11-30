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
            
            return "successfully uploaded";
        } catch (e) {
            throw Error('picture upload failed');
        }
    }
    throw Error('user not found');
}

userSchema.statics.defaultProfilePic = async function() {
    const destinationFile = `public/pics/stray1.jpg`;
    fsExtra.readFile(destinationFile, (err, data) => {
        if (err) {
            console.error(err);
            throw Error('default profile picture upload failed');
        }
          
        // Convert the file content to a Base64 string
        const imageData = data.toString('base64');
        return imageData;
    })
};

userSchema.statics.editProfile = function (userData) {
    console.log("read in edit profile")
    console.log(userData);

        return this.findByIdAndUpdate(userData.id, { 
                $set: { 
                    name: userData.name,
                    email: userData.email,
                    address: userData.address,
                    email: userData.email
                }
            }, { runValidators: true, new: true })
            .then((updateData) => console.log(updateData))
            .catch((error) => {
                console.log("NOT WORKING");
                console.log(error);
                throw error
            })

};



const User = mongoose.model('User', userSchema);
module.exports = User;