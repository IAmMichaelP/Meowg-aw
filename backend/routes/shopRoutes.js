const { Router } = require('express');
const shopController = require('../controllers/shopController');

const router = Router();

router.get('/shop', shopController.shop_get);

module.exports = router;