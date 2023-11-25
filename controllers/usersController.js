const User = require('../models/user');
const Stray = require('../models/stray');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fsExtra = require('fs-extra');

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

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
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({ 
            role: req.body.role, 
            username: req.body.username, 
            name: req.body.username, 
            email: req.body.email, 
            password: hashedPassword 
        });
        console.log(user);
        user.save()
            .then((result) => {
                const token = createToken(user._id);
                res.cookie('jwt', token, { maxAge: maxAge * 1000 })
                    .redirect('/profile/' + user._id)
            })
            .catch((err) => {
                res.status(500).send()
            });
    } catch {
        res.status(500).send()
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

module.exports.edit_profile = (req, res) => {
    
    try{
        const id = req.params.id;

        const folderPath = 'public/pics';
        // readdirSync is a synchronous function that returns an array of files in that specific folder
        const files = fsExtra.readdirSync(folderPath);
        const numberOfFiles = files.length;
        // lastFile points to the last file in the folder
        const lastFile = numberOfFiles;
        const regex = new RegExp(`^${lastFile}\.`);
        // we are trying to save the filename of the last file
        const filename = files.find(item => regex.test(item));

        fsExtra.readFile(destinationFile, async (err, data) => {
            if (err) {
              console.error(err);
              return res.status(500).send('Error reading the file');
            }
            console.log("working");
            // Convert the file content to a Base64 string
            const imageData = data.toString('base64');
            await User.uploadPic(id, imageData);
        })
    } catch {
        console.log("error");
    }
};