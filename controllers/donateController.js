const url = require('url');

module.exports.donate_get = (req, res) => {
    const parsedUrl = url.parse(req.originalUrl);
    const queryString = parsedUrl.search || '';
    const statusCode = queryString ? 302 : 200;
    res.render('donate', { title: 'DONATE', statusCode: statusCode });
};

module.exports.myInfo_get = (req, res) => {
    const parsedUrl = url.parse(req.originalUrl);
    const queryString = parsedUrl.search || '';
    const statusCode = queryString ? 302 : 200;
    res.render('donate-myinfo', { title: 'DONATE', statusCode: statusCode });
};

module.exports.payment_get = (req, res) => {
    const parsedUrl = url.parse(req.originalUrl);
    const queryString = parsedUrl.search || '';
    const statusCode = queryString ? 302 : 200;
    res.render('donate-payment', { title: 'DONATE', statusCode: statusCode });
};

module.exports.confirmation_get = (req, res) => {
    const parsedUrl = url.parse(req.originalUrl);
    const queryString = parsedUrl.search || '';
    const statusCode = queryString ? 302 : 200;
    res.render('donate-confirm', { title: 'DONATE', statusCode: statusCode });
};