const { Router } = require('express');
const adminController = require('../controllers/adminController');
const { requireAuth } = require('../middlewares/authMiddleware');

const router = Router();

router.get('/admin-dashboard/users', requireAuth, adminController.users_get);
router.get('/admin-dashboard/strays', requireAuth, adminController.strays_get);
router.get('/admin-dashboard/donations', requireAuth, adminController.donations_get);
router.get('/admin-dashboard/blogs', requireAuth, adminController.blogs_get);
router.get('/admin-dashboard/shop', requireAuth, adminController.shop_get);
router.get('/admin-dashboard/faqs', requireAuth, adminController.faqs_get);
router.get('/admin-dashboard/messages', requireAuth, adminController.messages_get);
router.get('/admin-dashboard/adopt', requireAuth, adminController.adopt_get);

module.exports = router;