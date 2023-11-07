const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const maxAge = 1 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'kmjs holdings secret payload', {
        expiresIn: maxAge
    });
}

module.exports.signup_post = async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({ username: req.body.username, email: req.body.email, password: hashedPassword });
        user.save()
            .then((result) => {
                const token = createToken(user._id);
                res.cookie('jwt', token, { maxAge: maxAge * 1000 })
                    .redirect('/admin/' + user._id)
            })
            .catch((err) => {
                res.status(500).send()
            });
    } catch {
        res.status(500).send()
    }
};

module.exports.signin_post = async (req, res) => {
    const email = { email: req.body.email };
    const reference = req.get('Referrer');
    const url = new URL(reference);
    const redirection = url.pathname;

    try {
        const match = await User.find(email)
        .then(result => {return result} );

        if (match.length == 0) {
            res.status(400).redirect(redirection+'?redirect=true');
            return; // If no match, redirect and exit the function
        }
        if (await bcrypt.compare(req.body.password, match[0].password)) {
            const token = createToken(match[0]._id);
            res.cookie('jwt', token, { maxAge: maxAge * 1000 })
                .redirect('/admin/' + match[0]._id)
        } else {
            res.status(400).redirect(redirection+'?redirect=true');
        }
    } catch (err) {
        res.status(500).send();
    }
};

module.exports.user_get = (req, res) => {
    const id = req.params.id;
    User.findById(id).
        then((result) =>{
            res.render('admin-dashboard', { title: 'ADMIN', user: result });
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
        .redirect('/');
}

module.exports.profile_get = (req, res) => {
    const username = req.params.username;
    User.findOne(username).
        then((result) =>{
            res.render('user-profile');
        })
        .catch((err) => {
            console.log(err);
        });
};