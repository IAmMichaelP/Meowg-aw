const { Router } = require('express');
const straysController = require('../controllers/straysController');
const { requireAuth } = require('../middlewares/authMiddleware');
const fileUpload = require('express-fileupload');

const router = Router();

router.post('/adopt', straysController.adopt_post);
router.get('/create', requireAuth, straysController.upload_get);
router.post('/create', fileUpload('img'), straysController.upload_post);
router.put('/admin/stray/approve-adoption', straysController.adopt_approve_put);
router.put('/admin/stray/approve-stray', straysController.stray_approve_put);
router.delete('/admin/stray/delete', straysController.stray_delete);

module.exports = router;