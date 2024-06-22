const Stray = require('../models/stray');
const Adopt = require('../models/adopt');
const path = require('path');
const fsExtra = require('fs-extra');
const url = require('url');

module.exports.adopt_post = (req, res) => {
    const adopt = new Adopt(req.body);
    Stray.findById(adopt.strayId)
        .then(result => {
            result.status = "evaluation for adoption ongoing";
            const stray = new Stray(result);
            adopt.strayName = stray.name;
            stray.save()
                .then(() => {
                    return adopt.save()
                })
                .then(() => {
                    res.redirect("/gallery");
                })
        })
        .catch(err => {console.error(err);});
};

module.exports.upload_get = (req, res) => {
    const parsedUrl = url.parse(req.originalUrl);
    const queryString = parsedUrl.search || '';
    res.render('create', { title: 'CREATE' });
};

// controller to be called when a post request is done on /create url
module.exports.upload_post = (req, res) => {
               
    req.body.imgData = req.files.img.data.toString('base64');
    const stray = new Stray(req.body);
    stray.save()
        .then((result) => {
            res.status(200).json({ user: req.body.uploader });
        })
        .catch((err) => {
            console.log(err);
        });
                
};

module.exports.adopt_approve_put = async (req, res) => {
    try {
        const stray = await Stray.findByIdAndUpdate(
          req.body.id,
          { $set: { status: "adopted" } }, // Set the new status here
          { new: true } // Return the updated document
        )
        if (stray) {
            console.log("Updated");
            res.status(200).json({ stray: stray._id });
        }
    } catch (err) {
        res.render('500');
    }
};

module.exports.stray_approve_put = async (req, res) => {
    try {
        const stray = await Stray.findByIdAndUpdate(
          req.body.id,
          { $set: { status: "available for adoption" } }, // Set the new status here
          { new: true } // Return the updated document
        )
        if (stray) {
            console.log("Updated");
            res.status(200).json({ stray: stray._id });
        }
    } catch (err) {
        res.render('500');
    }
};

module.exports.stray_delete = (req, res) => {
    Stray.findByIdAndDelete(req.body.id)
        .then(() => {
            console.log("deleted stray")
            res.status(200).json({ stray: req.body.id })
        })
        .catch (err => res.redirect('/500'))
};