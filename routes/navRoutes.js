const { Router } = require('express');
const navController = require('../controllers/navController');

const router = Router();

router.get('/', navController.home_get);
router.get('/gallery', navController.gallery_get);
router.get('/about', navController.about_get);
router.get('/blogs', navController.blogs_get);
router.get('/faqs', navController.faqs_get);
router.post('/about/message', navController.message_post);
router.get('/500', navController.internal_server_error_get);
router.post('/admin/nav/add-faqs', navController.faqs_post);

module.exports = router;