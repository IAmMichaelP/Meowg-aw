const { Router } = require('express');
const donateController = require('../controllers/donateController');

const router = Router();

router.get('/donate', donateController.donate_get);
router.get('/donate-myinfo', donateController.myInfo_get);
router.get('/donate-payment', donateController.payment_get);
router.get('/donate-confirm', donateController.confirmation_get);
router.post('/admin/donate/add-inventory', donateController.inventory_post);
router.post('/donate', donateController.donate_post);
router.delete('/admin/delete-donation', donateController.donate_delete);
// router.put('/inventory', donateController.inventory_put);

module.exports = router;