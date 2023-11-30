const User = require('../models/user');
const Stray = require('../models/stray');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fsExtra = require('fs-extra');

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
    if (err.message.includes('User validation failed')) {
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
            res.render('admin-dashboard', { 
                title: 'ADMIN', 
                user: result, 
                strays: strays, 
                pendingStrays: pendingStrays, 
                approvedStrays: approvedStrays });
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
        res.render('user-profile', { uploadedStrays });
    } catch {
        console.log("error");
    }
    
};

module.exports.edit_profile_put = async (req, res) => {
    const { email, password } = req.body;
    try{
        if (!req.files){
            throw new Error('No image data provided');
        } else {
            
            const imageData = req.files.img.data.toString('base64');
        }

        const user = await User.login(email, password);
        if (user) {
            const upload = await User.uploadPic(user, imageData);
            if(upload == "successfully uploaded") {
                res.status(200).json({ user: user._id });
            }
        }
    } catch(err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};