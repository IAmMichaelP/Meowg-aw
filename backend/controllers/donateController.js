const url = require('url');
const Inventory = require('../models/inventory');
const Donation = require('../models/donation');
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
 
    const inventoryReport = new Inventory({
        amount: req.body.amount,
        uploader: req.body.uploader,
        weeklyExpenses: req.body.weeklyExpenses,
        week: {
            start: req.body.weekStart,
            end: req.body.weekEnd
        },
        rescuedAnimals: req.body.rescuedAnimals
    });
    
    inventoryReport.save()
        .then(result => {
            res.status(200).json({ user: req.body.uploader });
        })
        .catch(error => {
            console.error(error);
            res.render('500');
        });
        
};

module.exports.inventory_delete = async (req, res) => {
    Inventory.findByIdAndDelete(req.body.id)
        .then(() => {
            res.status(200).json({ user: req.body.id })
        })
        .catch (err => res.redirect('/500'))
}

module.exports.donate_post = (req, res) => {
    console.log(req.body)
    const donation = new Donation({
        donor: req.body.donor,
        donation: {
            // type: "monetary",
            amount: req.body.amount,
            paymentType: req.body.paymentType,
            accountNumber: req.body.accountNumber,
            accountName: req.body.accountName,
        },
        phoneNumber: req.body.phoneNumber
    });

    donation.save()
        .then(async result => {
            console.log(result);
            const inventory = await Inventory.find().sort({_id: -1}).limit(1)
            await Inventory.findByIdAndUpdate(inventory[0]._id, 
                { $inc: { amount: req.body.amount } },
                { new: true });
            res.status(200).json({ donation: donation._id });
        })
        .catch(error => {
            console.error(error);
            res.render('500');
        });
};

module.exports.donate_delete = (req, res) => {
    Donation.findByIdAndDelete(req.body.id)
        .then(() => {
            res.status(200).json({ user: req.body.id })
        })
        .catch (err => res.redirect('/500'))
};