const { Router } = require('express');
const donateController = require('../controllers/donateController');

const router = Router();

router.get('/donate', donateController.donate_get);
router.get('/donate-myinfo', donateController.myInfo_get);
router.get('/donate-payment', donateController.payment_get);
router.get('/donate-confirm', donateController.confirmation_get);

module.exports = router;