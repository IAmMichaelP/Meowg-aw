const Stray = require('../models/stray');
const Blog = require('../models/blog');
const Message = require('../models/message');
const Faqs = require('../models/faq');
const url = require('url');

module.exports.home_get = (req, res) => {
    
    Stray.findApprovedStrays()
        .then((result) => {
            res.render('index', { title: 'HOME', strays: result });
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports.gallery_get = (req, res) => {
    Stray.findApprovedStrays()
        .then((result) => {
            result = JSON.stringify(result);
            res.render('gallery', { title: 'GALLERY', strays: result });
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports.about_get = (req, res) => {
    res.render('about', { title: 'ABOUT' });
};

module.exports.blogs_get = async (req, res) => {
    const blogs = await Blog.findApprovedBlogs();
    res.render('blogs', { title: 'BLOGS', blogs: blogs });
};

module.exports.faqs_get = (req, res) => {
    res.render('faqs', { title: 'FAQs' });
};

module.exports.message_post = (req, res) => {
    const message = new Message({
        
        senderEmail: req.body.senderEmail,
        senderName: req.body.senderName,
        receiver: "Admin",
        messageSubject: req.body.messageSubject,
        messageBody: req.body.messageBody,
        status: "pending"

    });

    message.save()
        .then((result) => {
            console.log(result);
            res.status(200).json({ message: message._id });
        })
        .catch ((error) => {
            console.log(error);
            res.render('500');
        });
};

module.exports.faqs_post = (req, res) => {
    console.log(req.body);
    const faqComponent = new Faqs ({
        uploader: req.body.uploader,
        question: req.body.question,
        answer: req.body.answer
    });
    
    faqComponent.save()
        .then(result => {
            console.log(result);
            res.status(200).json({ user: req.body.uploader });
        })
        .catch(error => {
            console.error(error);
            res.render('500');
        });
        
};

module.exports.message_put = async (req, res) => {
    try {
        const message = await Message.findByIdAndUpdate(
        req.body.id,
        { $set: { status: "acknowledged" } }, // Set the new role here
        { new: true } // Return the updated document
        )
        if (message) {
            res.status(200).json({ user: message._id });
        }
    } catch (err) {
        res.render('500');
    }
    
};

module.exports.message_delete = async (req, res) => {
    Message.findByIdAndDelete(req.body.id)
        .then(() => {
            res.status(200).json({ user: req.body.id })
        })
        .catch (err => res.redirect('/500'))
}

module.exports.faqs_delete = async (req, res) => {
    Faqs.findByIdAndDelete(req.body.id)
        .then(() => {
            res.status(200).json({ user: req.body.id })
        })
        .catch (err => res.redirect('/500'))
}

module.exports.internal_server_error_get = (req, res) => {
    res.render('500');
};

module.exports.faqs_put = async (req, res) => {
    
    try {
        const faqs = await Faqs.findByIdAndUpdate(
        req.body.id,
        { $set: { question: req.body.question, answer: req.body.answer } }, // Set the new role here
        { new: true } // Return the updated document
        )

        if (faqs) {
            
            res.status(200).json({ user: faqs._id });
        }
    } catch (err) {
        res.render('500');
    }
    
};