const express = require('express');
const mongoose = require('mongoose');
const Stray = require('./models/stray');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const multer = require('multer');
const url = require('url');

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
        cb(null, String(numberOfFiles + 1) + path.extname(file.originalname));
    }
});
const upload = multer({storage: storage});

// middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.post('/adopt', (req, res) =>{
    console.log("ADOPTINGGGG");
    console.log(req.body);
    res.send("adopted");
})

app.get('/', (req, res) =>{
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
})

app.get('/gallery', (req, res) =>{
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
})

app.get('/about', (req, res) =>{
    const parsedUrl = url.parse(req.originalUrl);
    const queryString = parsedUrl.search || '';
    const statusCode = queryString ? 302 : 200;
    res.render('about', { title: 'ABOUT', statusCode: statusCode });
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
    const reference = req.get('Referrer');
    const url = new URL(reference);
    const redirection = url.pathname;

    try {
        const match = await User.find(email)
        .then(result => {return result} );

        if (match.length == 0) {
            res.status(400).redirect(redirection+'?redirect=true');
            return; // If no match, redirect and exit the function
        }
        if (await bcrypt.compare(req.body.password, match[0].password)) {
            res.redirect('/admin/' + match[0]._id)
        } else {
            res.status(400).redirect(redirection+'?redirect=true');
        }
    } catch (err) {
        res.status(500).send();
    }
})

app.get('/blogs', (req, res) =>{
    const parsedUrl = url.parse(req.originalUrl);
    const queryString = parsedUrl.search || '';
    const statusCode = queryString ? 302 : 200;
    res.render('blogs', { title: 'BLOGS', statusCode: statusCode });
})

app.get('/faqs', (req, res) =>{
    const parsedUrl = url.parse(req.originalUrl);
    const queryString = parsedUrl.search || '';
    const statusCode = queryString ? 302 : 200;
    res.render('faqs', { title: 'FAQs', statusCode: statusCode });
})

app.use((req, res) => {
        res.render('404');
})
