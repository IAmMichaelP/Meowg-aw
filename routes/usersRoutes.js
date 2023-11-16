const usersController = require('../controllers/usersController');
const { Router } = require('express');
const { requireAuth } = require('../middlewares/authMiddleware');

const router = Router();

router.post('/signup', usersController.signup_post);
router.post('/signin', usersController.signin_post);
router.get('/admin/:id', requireAuth, usersController.admin_get);
router.get('/logout', usersController.logout_get);
router.get('/profile/:id', requireAuth, usersController.profile_get);

module.exports = router;