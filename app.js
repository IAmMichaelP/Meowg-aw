const express = require('express');
const mongoose = require('mongoose');
const Stray = require('./models/stray');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const multer = require('multer');

const path = require('path');
const fsExtra = require('fs-extra');

// express app
const app = express();

// connect to mongo database
const dbURI = 'mongodb+srv://Miki:06422Meowgawdatabase@meowgaw.o1wmqdk.mongodb.net/';
mongoose.connect(dbURI)
    .then((result) => app.listen(3000 || process.env.PORT))
    .catch((err) => console.log(err)); 

// register view engine
app.set('view engine', 'ejs');

// defining storage 
let folderPath = 'public/pics';
let files = fsExtra.readdirSync(folderPath);
let numberOfFiles = files.length;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, folderPath);
    },
    filename: (req, file, cb) => {
        // const name = String(numberOfFiles + 1) + path.extname(file.originalname);
        // req.body.imgSrc = req.body.imgSrc.replace('public/', '');
        // req.body.imgSrc += '/' + name;
        cb(null, String(numberOfFiles + 1) + path.extname(file.originalname));
    }
});
const upload = multer({storage: storage});

// middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) =>{
    Stray.find()
        .then((result) => {
            res.render('index', { title: 'HOME', strays: result });
        })
        .catch((err) => {
            console.log(err);
        });
})

app.get('/gallery', (req, res) =>{
    
    Stray.find()
        .then((result) => {
            res.render('gallery', { title: 'GALLERY', strays: result });
        })
        .catch((err) => {
            console.log(err);
        });
})

app.get('/about', (req, res) =>{
    res.render('about', { title: 'ABOUT' });
})

app.get('/create', (req, res) =>{
    res.render('create', { title: 'CREATE' });
});

app.get('/admin/:id', (req, res) =>{
    const id = req.params.id;
    User.findById(id).
        then((result) =>{
            res.render('admin-dashboard', { title: 'ADMIN', user: result });
        })
        .catch((err) => {
            console.log(err);
        });
});

app.post('/create', upload.single('input-file'), (req, res) =>{
    // This is using multer to save images but since I can't code multer to save it to specific dog or cat folder
    // What i did was to save it to pics folder then moving it if it's cat or dog folder

    console.log("----------------------------6")
    let folderPath = 'public/pics';
    let files = fsExtra.readdirSync(folderPath);
    let numberOfFiles = files.length;
    const lastFile = numberOfFiles;
    const regex = new RegExp(`^${lastFile}\.`);
    const oldName = files.find(item => regex.test(item));
    let destinationFolder = req.body.animal === "cat" ? 'cat' : 'dog';
    console.log(destinationFolder);
    console.log(req.body);
    folderPath = `public/pics/${destinationFolder}`;
    files = fsExtra.readdirSync(folderPath);
    numberOfFiles = files.length;
    console.log(numberOfFiles);
    console.log(oldName);
    console.log(lastFile);
    
    const newName = oldName.replace(String(lastFile), String(numberOfFiles + 1));
    console.log(newName);
    const sourcePath = path.join('public', 'pics', oldName);
    let destinationPath = path.join('public', 'pics', destinationFolder, newName);

    fsExtra.move(sourcePath, destinationPath)
        .then(() => {
            destinationPath = destinationPath.replace('public\\', '');
            console.log(destinationPath);
            req.body.imgSrc = destinationPath;
            console.log(req.body);
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
    
    
})


app.post('/signup', async (req, res) => {
    console.log('signing up...');
    try{
        
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({ username: req.body.username, email: req.body.email, password: hashedPassword });
        user.save()
            .then((result) => {
                res.redirect('/admin/' + user._id)
            })
            .catch((err) => {
                res.status(500).send()
            });
    } catch {
        res.status(500).send()
    }
});

app.post('/signin', async (req, res) => {
    const email = { email: req.body.email };

    try {
        const match = await User.find(email)
        .then(result => {return result} );

        if (match.length == 0) {
            res.status(400).redirect('/');
            return; // If no match, redirect and exit the function
        }
        if (await bcrypt.compare(req.body.password, match[0].password)) {
            res.redirect('/admin/' + match[0]._id)
        } else {
            res.status(400).redirect('/');
        }
    } catch (err) {
        res.status(500).send();
    }
})

app.use((req, res) => {
        res.render('404');
})