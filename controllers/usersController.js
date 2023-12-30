const User = require('../models/user');
const Stray = require('../models/stray');
const Blog = require('../models/blog');
const Message = require('../models/message');
const Inventory = require('../models/inventory');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '', imageData: '' };

    // no img data found
    if (err.message === 'No image data provided') {
        errors.imageData = 'Image data not found';
    }

    // incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'That email is not registered';
    }

    // incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'That password is incorrect';
    }

    // duplicate email error
    if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
    }

    // validation errors
    if (err.message.includes('User validation failed') || err.message.includes('Validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
        });
    }

return errors;
}  

const maxAge = 1 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'kmjs holdings secret payload', {
        expiresIn: maxAge
    });
}

module.exports.signup_post = async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({ 
            role: req.body.role, 
            username: req.body.username, 
            name: req.body.username, 
            email: req.body.email, 
            password: hashedPassword 
        });

        user.save()
            .then((result) => {
    
                const token = createToken(user._id);
                res.cookie('jwt', token, { maxAge: maxAge * 1000 });
                res.status(200).json({ user: user._id });
            })
            .catch((err) => {
                // Handle mongoose validation errors
                const errors = handleErrors(err);
                console.log(errors);
                res.status(400).json({ errors });
            });
    } catch {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

module.exports.signin_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
    } 
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

module.exports.admin_get = (req, res) => {
    const id = req.params.id;
    
    User.findById(id).
        then( async (result) =>{
            let strays = await Stray.find();
            strays = strays.filter(stray => stray.status == "evaluation for adoption ongoing");
            strays = JSON.stringify(strays);
            const pendingStrays = await Stray.findPendingStrays();
            const approvedStrays = await Stray.findApprovedStrays();
            const pendingBlogs = await Blog.findPendingBlogs();
            const messages = await Message.find();
            let currentInventory = await Inventory.find().sort({_id: -1}).limit(1);
            currentInventory = currentInventory[0];
            const users = await User.find();

            res.render('admin-dashboard', { 
                title: 'ADMIN', 
                user: result, 
                strays: strays, 
                pendingStrays: pendingStrays, 
                approvedStrays: approvedStrays,
                pendingBlogs: pendingBlogs,
                messages: messages,
                currentInventory: currentInventory,
                users: users
             });
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
        .redirect('/');
}

module.exports.profile_get = async (req, res) => {
    try{
        const id = req.params.id;
        const uploadedStrays = await Stray.findUploadedStrays(id);
        const userBlogs = await Blog.findUserBlogs(id);
        res.render('user-profile', { uploadedStrays, userBlogs });
    } catch {
        res.render('500');
    }
    
};

module.exports.edit_profile_put = async (req, res) => {
    try{
        // defines image data into base64 string before saving into database
        let imageData = req.body.image;
        if (req.files){
           imageData = req.files.img.data.toString('base64');
        }
        // ensures that the image data is preserved so if the user gave no img, then the default img data will remain unchanged
        req.body.img = imageData;

        // matches if the user provided its right password
        const { password } = await User.findById(req.body.id);
        const auth = await bcrypt.compare(req.body.password, password);

        if (auth) {
            // updating the data based from the given data of the user
            const user = await User.editProfile(req.body);
            res.status(200).json({ user: user._id });
        } else {
            throw Error('incorrect password');
        }
        // const user = await User.login(email, req.body.password);
        // if (user) {
        //     await User.uploadPic(user, imageData);
        //     await User.editProfile(req.body);
        //     res.status(200).json({ user: user._id });
        // }
            
        
        
    } catch(err) {
        const errors = handleErrors(err);
        console.log(err);
        res.status(400).json({ errors });
    }
};

module.exports.blog_post = (req, res) => {
    const blog = new Blog({
        uploader: req.body.uploader,
        title: req.body.title,
        status: "pending",
        body: req.body.body
    });

    blog.save()
        .then((result) => {
            console.log(result);
            res.status(200).json({ user: blog.uploader });
        })
        .catch ((error) => {
            console.log(error);
            res.render('500');
        });
};

module.exports.user_role_put = async (req, res) => {
    console.log(req.body);
    try {
        const user = await User.findByIdAndUpdate(
          req.body.id,
          { $set: { role: req.body.role } }, // Set the new role here
          { new: true } // Return the updated document
        )
        if (user) {
            console.log("Updated");
            console.log(user.role);
            res.status(200).json({ user: user._id });
        }
    } catch (err) {
        res.render('500');
    }
};

module.exports.user_delete = async (req, res) => {
    console.log("deleting user")
    User.findByIdAndDelete(req.body.id)
        .then(() => {
            console.log("deleted user")
            res.status(200).json({ user: req.body.id })
        })
        .catch (err => res.redirect('/500'))
}