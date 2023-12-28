const url = require('url');
const Inventory = require('../models/inventory');
const { resolveSoa } = require('dns');

module.exports.donate_get = async (req, res) => {
    // const parsedUrl = url.parse(req.originalUrl);
    // const queryString = parsedUrl.search || '';
    const inventory = await Inventory.find().sort({_id: -1}).limit(1)

    res.render('donate', { title: 'DONATE', inventory: inventory[0] });
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

module.exports.inventory_post = (req, res) => {
 
    const inventoryItem = new Inventory({
        amount: req.body.amount,
        supplies: {
            type: req.body.supply,
            amount: req.body.supplyAmount
        },
        weeklyExpenses: req.body.weeklyExpenses,
        week: {
            start: req.body.weekStart,
            end: req.body.weekEnd
        },
        rescuedAnimals: req.body.rescuedAnimals
    });
    
    inventoryItem.save()
        .then(result => {
            res.status(200).send(result);
        })
        .catch(error => {
            console.error(error);
            res.render('505');
        });
        
};