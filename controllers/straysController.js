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
            console.log("1");
            const stray = new Stray(result);
            adopt.strayName = stray.name;
            console.log("2");
            stray.save()
                .then(() => {
                    console.log("3")
                    return adopt.save()
                })
                .then(() => {
                    console.log("4");
                    res.redirect("/gallery");
                })
        })
        .catch(err => {console.error(err);});
};

module.exports.upload_get = (req, res) => {
    const parsedUrl = url.parse(req.originalUrl);
    const queryString = parsedUrl.search || '';
    const statusCode = queryString ? 302 : 200;
    res.render('create', { title: 'CREATE', statusCode: statusCode });
};

module.exports.upload_post = (req, res) => {
    // This is using multer to save images but since I can't code multer to save it to specific dog or cat folder
    // What i did was to save it to pics folder then moving it if it's cat or dog folder
    let folderPath = 'public/pics';
    let files = fsExtra.readdirSync(folderPath);
    let numberOfFiles = files.length;
    const lastFile = numberOfFiles;
    const regex = new RegExp(`^${lastFile}\.`);
    const oldName = files.find(item => regex.test(item));
    let destinationFolder = req.body.animal === "cat" ? 'cat' : 'dog';
    folderPath = `public/pics/${destinationFolder}`;
    files = fsExtra.readdirSync(folderPath);
    numberOfFiles = files.length;
    
    const newName = oldName.replace(String(lastFile), String(numberOfFiles + 1));
    const sourcePath = path.join('public', 'pics', oldName);
    let destinationPath = path.join('public', 'pics', destinationFolder, newName);

    fsExtra.move(sourcePath, destinationPath)
        .then(() => {
            destinationPath = destinationPath.replace('public\\', '');
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