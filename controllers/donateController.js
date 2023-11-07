const url = require('url');

module.exports.donate_get = (req, res) => {
    const parsedUrl = url.parse(req.originalUrl);
    const queryString = parsedUrl.search || '';
    res.render('donate', { title: 'DONATE' });
};

module.exports.myInfo_get = (req, res) => {
    const parsedUrl = url.parse(req.originalUrl);
    const queryString = parsedUrl.search || '';
    res.render('donate-myinfo', { title: 'DONATE' });
};

module.exports.payment_get = (req, res) => {
    const parsedUrl = url.parse(req.originalUrl);
    const queryString = parsedUrl.search || '';
    res.render('donate-payment', { title: 'DONATE' });
};

module.exports.confirmation_get = (req, res) => {
    const parsedUrl = url.parse(req.originalUrl);
    const queryString = parsedUrl.search || '';
    res.render('donate-confirm', { title: 'DONATE' });
};