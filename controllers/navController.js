const Stray = require('../models/stray');
const url = require('url');

module.exports.home_get = (req, res) => {
    
    Stray.findApprovedStrays()
        .then((result) => {
            res.render('index', { title: 'HOME', strays: result });
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports.gallery_get = (req, res) => {
    Stray.findApprovedStrays()
        .then((result) => {
            result = JSON.stringify(result);
            res.render('gallery', { title: 'GALLERY', strays: result });
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports.about_get = (req, res) => {

    res.render('about', { title: 'ABOUT' });
};

module.exports.blogs_get = (req, res) => {

    res.render('blogs', { title: 'BLOGS' });
};

module.exports.faqs_get = (req, res) => {

    res.render('faqs', { title: 'FAQs' });
};
