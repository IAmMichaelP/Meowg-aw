const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const express = require('express');
const User = require('../models/user');

const app = express();
app.use(cookieParser());

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // check json web token if it exists & validate it
    if (token) {
        jwt.verify(token, 'kmjs holdings secret payload', (err, decodedToken) => {
            if (err){
                res.locals.allow = false;
                console.log(err.message);
            } else {
                res.locals.allow = true;
                next();
            }
        });  
    } else {
        res.redirect('/');
    }
}

// check the current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    
    if (token) {
        jwt.verify(token, 'kmjs holdings secret payload', async (err, decodedToken) => {
            if (err){
                res.locals.user = null;
                next();
            } else {
                let user = await User.findById(decodedToken.id);
                
                user = JSON.stringify(user);
                res.locals.user = user;
                next();
            }
        });  
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports = { requireAuth, checkUser };