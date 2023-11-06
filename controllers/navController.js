const Stray = require('../models/stray');
const url = require('url');

module.exports.home_get = (req, res) => {
    const parsedUrl = url.parse(req.originalUrl);
    const queryString = parsedUrl.search || '';
    Stray.find()
        .then((result) => {
            const statusCode = queryString ? 302 : 200;
            res.render('index', { title: 'HOME', strays: result, statusCode: statusCode });
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports.gallery_get = (req, res) => {
    const parsedUrl = url.parse(req.originalUrl);
    const queryString = parsedUrl.search || '';
    Stray.find()
        .then((result) => {
            const statusCode = queryString ? 302 : 200;
            res.render('gallery', { title: 'GALLERY', strays: result, statusCode: statusCode });
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports.about_get = (req, res) => {
    const parsedUrl = url.parse(req.originalUrl);
    const queryString = parsedUrl.search || '';
    const statusCode = queryString ? 302 : 200;
    res.render('about', { title: 'ABOUT', statusCode: statusCode });
};

module.exports.blogs_get = (req, res) => {
    const parsedUrl = url.parse(req.originalUrl);
    const queryString = parsedUrl.search || '';
    const statusCode = queryString ? 302 : 200;
    res.render('blogs', { title: 'BLOGS', statusCode: statusCode });
};

module.exports.faqs_get = (req, res) => {
    const parsedUrl = url.parse(req.originalUrl);
    const queryString = parsedUrl.search || '';
    const statusCode = queryString ? 302 : 200;
    res.render('faqs', { title: 'FAQs', statusCode: statusCode });
};
