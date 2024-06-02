const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const express = require('express');
const User = require('../models/user');
const Cart = require('../models/cart');

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
const checkUser = async (req, res, next) => {
    const token = req.cookies.jwt;
    
    if (token) {
        jwt.verify(token, 'kmjs holdings secret payload', async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                res.locals.cart = null;
                next();
            } else {
                try {
                    let user = await User.findById(decodedToken.id);
                    if (user) {
                        let cart = await Cart.findOne({ user: user._id }).populate('cart.merch');
                        res.locals.user = user;
                        res.locals.cart = cart ? cart.cart : [];
                    } else {
                        res.locals.user = null;
                        res.locals.cart = null;
                    }
                    next();
                } catch (error) {
                    console.error('Error fetching user or cart:', error);
                    res.locals.user = null;
                    res.locals.cart = null;
                    next();
                }
            }
        });  
    } else {
        res.locals.user = null;
        res.locals.cart = null;
        next();
    }
}

module.exports = { requireAuth, checkUser };