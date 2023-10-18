const express = require('express');
const mongoose = require('mongoose');
const Stray = require('./models/stray');
const document = require('jsdom');

// express app
const app = express();

// connect to mongo database
const dbURI = 'mongodb+srv://Miki:06422Meowgawdatabase@meowgaw.o1wmqdk.mongodb.net/';
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err)); 

// register view engine
app.set('view engine', 'ejs');

// middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) =>{
    Stray.find()
        .then((result) => {
            res.render('index', { strays: result });
        })
        .catch((err) => {
            console.log(err);
        });
})

app.get('/gallery', (req, res) =>{
    
    Stray.find()
        .then((result) => {
            res.render('gallery', { strays: result });
        })
        .catch((err) => {
            console.log(err);
        });
})

app.post('/create', (req, res) =>{
    const stray = new Stray(req.body);
    stray.save()
        .then((result) => {
            res.redirect('/gallery')
        })
        .catch((err) => {
            console.log(err);
        });
})
app.get('/about', (req, res) =>{
    res.render('about');
})

app.get('/create', (req, res) =>{
    res.render('create');
});