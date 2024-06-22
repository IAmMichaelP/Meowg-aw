const multer = require('multer');
const usersController = require('../controllers/usersController');
const { Router } = require('express');
const { requireAuth } = require('../middlewares/authMiddleware');
const path = require('path');
const fsExtra = require('fs-extra');
const fileUpload = require('express-fileupload');

const router = Router();

router.post('/signup', usersController.signup_post);
router.post('/signin', usersController.signin_post);
router.get('/admin/:id', requireAuth, usersController.admin_get);
router.get('/logout', usersController.logout_get);
router.get('/profile/:id', requireAuth, usersController.profile_get);
router.put('/profile/edit-profile', fileUpload('img'), usersController.edit_profile_put);
router.post('/profile/blog', usersController.blog_post);
router.put('/admin/user/edit-role', usersController.user_role_put);
router.delete('/admin/user/delete', usersController.user_delete);
router.delete('/admin/user/delete-blog', usersController.blog_delete);
router.put('/admin/user/approve-blog', usersController.blog_put);

module.exports = router;