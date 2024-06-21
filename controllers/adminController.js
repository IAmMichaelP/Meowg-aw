const User = require('../models/user');
const Stray = require('../models/stray');
const Blog = require('../models/blog');
const Message = require('../models/message');
const Inventory = require('../models/inventory');
const Donation = require('../models/donation');
const Faqs = require('../models/faq');
const Cart = require('../models/cart');
const Purchase = require('../models/purchase');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.users_get = async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json({ users })
    } catch (error) {
        console.log(err);
    }
}

module.exports.strays_get = async (req, res) => {
    try{
        const pendingStrays = await Stray.findPendingStrays();
        const approvedStrays = await Stray.findApprovedStrays();
        res.status(200).json({ pendingStrays, approvedStrays })
    } catch (error) {
        console.log(err);
    }
}

module.exports.donations_get = async (req, res) => {
    try{
        const donations = await Donation.find();
        res.status(200).json({ donations })
    } catch (error) {
        console.log(err);
    }
}

module.exports.blogs_get = async (req, res) => {
    try{
        const pendingBlogs = await Blog.findPendingBlogs();
        res.status(200).json({ pendingBlogs })
    } catch (error) {
        console.log(err);
    }
}

module.exports.shop_get = async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json({ users })
    } catch (error) {
        console.log(err);
    }
}

module.exports.faqs_get = async (req, res) => {
    try{
        const faqs = await Faqs.findApprovedFaqs();
        res.status(200).json({ faqs })
    } catch (error) {
        console.log(err);
    }
}

module.exports.messages_get = async (req, res) => {
    try{
        const messages = await Message.find();
        res.status(200).json({ messages })
    } catch (error) {
        console.log(err);
    }
}

module.exports.purchases_get = async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json({ users })
    } catch (error) {
        console.log(err);
    }
}

module.exports.adopt_get = async (req, res) => {
    try{
        let strays = await Stray.find();
        evaluees = strays.filter(stray => stray.status == "evaluation for adoption ongoing");
        res.status(200).json({ evaluees })
    } catch (error) {
        console.log(err);
    }
}