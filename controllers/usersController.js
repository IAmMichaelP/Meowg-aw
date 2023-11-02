const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports.signup_post = async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({ username: req.body.username, email: req.body.email, password: hashedPassword });
        user.save()
            .then((result) => {
                res.redirect('/admin/' + user._id)
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
            res.redirect('/admin/' + match[0]._id)
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