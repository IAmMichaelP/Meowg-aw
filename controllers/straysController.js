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
    console.log(req.body);
    // This is using multer to save images but since I can't code multer to save it to specific dog or cat folder
    // What i did was to save it to pics folder then moving it if it's cat or dog folder
    let folderPath = 'public/pics';
    // readdirSync is a synchronous function that returns an array of files in that specific folder
    let files = fsExtra.readdirSync(folderPath);
    let numberOfFiles = files.length;
    // lastFile points to the last file in the folder
    const lastFile = numberOfFiles;
    const regex = new RegExp(`^${lastFile}\.`);
    // we are trying to save the filename of the last file
    const oldName = files.find(item => regex.test(item));
    let destinationFolder = req.body.animal === "cat" ? 'cat' : 'dog';
    folderPath = `public/pics/${destinationFolder}`;
    files = fsExtra.readdirSync(folderPath);
    numberOfFiles = files.length;
    const newName = oldName.replace(String(lastFile), String(numberOfFiles + 1));
    const sourcePath = path.join('public', 'pics', oldName);
    let destinationPath = path.join('public', 'pics', destinationFolder, newName);

    // synchronous function to move files from pic to a specific folder
    fsExtra.move(sourcePath, destinationPath)
        .then(() => {
            // redefining the destination folder so it won't include the public folder
            destinationPath = `pics/${destinationFolder}/${newName}`;
            req.body.imgSrc = destinationPath;
            const stray = new Stray(req.body);
            stray.save()
                .then((result) => {
                    res.redirect('/gallery')
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch(error => {
            console.error('Error renaming the file:', error);
        });
};