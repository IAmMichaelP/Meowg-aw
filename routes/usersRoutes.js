const usersController = require('../controllers/usersController');
const { Router } = require('express');
const { requireAuth } = require('../middlewares/authMiddleware');

const router = Router();

router.post('/signup', usersController.signup_post);
router.post('/signin', usersController.signin_post);
router.get('/admin/:id', requireAuth, usersController.user_get);
router.get('/logout', usersController.logout_get);
router.get('/profile/:username', requireAuth, usersController.profile_get);

module.exports = router;