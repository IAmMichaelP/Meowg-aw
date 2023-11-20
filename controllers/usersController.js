const User = require('../models/user');
const Strays = require('../models/stray');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '', faveColor: '', birthplace: '' };

    // incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'That email is not registered';
    }

    // incorrect faveColor
    if (err.message === 'incorrect favorite color') {
        errors.faveColor = 'That favorite color is incorrect';
    }

    // incorrect birthplace
    if (err.message === 'incorrect birthplace') {
        errors.birthplace = 'That birthplace is incorrect';
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
    if (err.message.includes('user validation failed')) {
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
    console.log(req.body);
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({ 
            role: req.body.role, 
            username: req.body.username, 
            email: req.body.email, 
            password: hashedPassword, 
            faveColor: req.body.faveColor, 
            birthplace: req.body.birthplace
        });
        console.log(user);
        console.log("Created");
        user.save()
            .then((result) => {
                console.log("inside the result object");
                console.log(result);
                const token = createToken(user._id);
                res.cookie('jwt', token, { maxAge: maxAge * 1000 })
                    .redirect('/profile/' + user._id)
            })
            .catch((err) => {
                console.log(err.message);
                res.status(500).send()
            });
    } catch {
        res.status(500).send()
    }
};

module.exports.signin_post = async (req, res) => {
    const { email, password, faveColor, birthplace } = req.body;
    console.log("in");
    console.log(req.body);
    console.log(req.body.faveColor);
    console.log("out");

    try {
        const user = await User.login(email, password, faveColor, birthplace);
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
            let strays = await Strays.find();
            strays = strays.filter(stray => stray.status == "evaluation for adoption ongoing");
            strays = JSON.stringify(strays);
            const pendingStrays = await Strays.findPendingStrays();
            const approvedStrays = await Strays.findApprovedStrays();
            res.render('admin-dashboard', { title: 'ADMIN', user: result, strays: strays, pendingStrays: pendingStrays, approvedStrays: approvedStrays });
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
        const uploadedStrays = await Strays.findUploadedStrays(id);
        res.render('user-profile', { uploadedStrays });
    } catch {
        console.log("error");
    }
    
};