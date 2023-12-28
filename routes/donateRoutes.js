const { Router } = require('express');
const donateController = require('../controllers/donateController');

const router = Router();

router.get('/donate', donateController.donate_get);
router.get('/donate-myinfo', donateController.myInfo_get);
router.get('/donate-payment', donateController.payment_get);
router.get('/donate-confirm', donateController.confirmation_get);
router.post('/inventory', donateController.inventory_post);
router.post('/donate', donateController.donate_post);

module.exports = router;