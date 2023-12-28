const multer = require('multer');
const usersController = require('../controllers/usersController');
const { Router } = require('express');
const { requireAuth } = require('../middlewares/authMiddleware');
const path = require('path');
const fsExtra = require('fs-extra');
const fileUpload = require('express-fileupload');

const router = Router();

// this is defining the folderpath where to receive the path
let folderPath = 'public/pics';
let files = fsExtra.readdirSync(folderPath);
let numberOfFiles = files.length;
// defining the storage where the images are uploaded by the users
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, folderPath);
    },
    filename: (req, file, cb) => {
      cb(null, String(numberOfFiles + 1) + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.post('/signup', usersController.signup_post);
router.post('/signin', usersController.signin_post);
router.get('/admin/:id', requireAuth, usersController.admin_get);
router.get('/logout', usersController.logout_get);
router.get('/profile/:id', requireAuth, usersController.profile_get);
router.put('/profile/edit-profile', fileUpload('img'), usersController.edit_profile_put);
router.post('/profile/blog', usersController.blog_post);

module.exports = router;