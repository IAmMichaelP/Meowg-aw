const express = require('express');
const mongoose = require('mongoose');
const navRoutes = require('./routes/navRoutes');
const usersRoutes = require('./routes/usersRoutes');
const donateRoutes = require('./routes/donateRoutes');
const straysRoutes = require('./routes/straysRoutes');
const shopRoutes = require('./routes/shopRoutes');
const cookieParser = require('cookie-parser');
const { checkUser } = require('./middlewares/authMiddleware');

// express app
const app = express();

// connect to mongo database
const dbURI = 'mongodb+srv://Miki:06422Meowgawdatabase@meowgaw.o1wmqdk.mongodb.net/';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(process.env.PORT || 3000))
    .catch((err) => console.log(err)); 

// register view engine
app.set('view engine', 'ejs');

// middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

// routes
app.get('*', checkUser);
app.use(navRoutes);
app.use(usersRoutes);
app.use(donateRoutes);
app.use(straysRoutes);
app.use(shopRoutes);

app.use((req, res) => {
    res.render('404');
})
