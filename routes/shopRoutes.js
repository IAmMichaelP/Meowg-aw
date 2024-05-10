const { Router } = require('express');
const shopController = require('../controllers/shopController');

const router = Router();

router.get('/shop', shopController.shop_get);
router.get('/shop-item', shopController.shopitem_get);

module.exports = router;