
module.exports.shop_get = (req, res) => {
    console.log("shop")
    res.render('shop', { title: 'SHOP' });
};