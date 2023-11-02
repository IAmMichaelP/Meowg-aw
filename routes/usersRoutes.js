const { Router } = require('express');
const usersController = require('../controllers/usersController');

const router = Router();

router.post('/signup', usersController.signup_post);
router.post('/signin', usersController.signin_post);
router.get('/admin/:id', usersController.user_get);

module.exports = router;