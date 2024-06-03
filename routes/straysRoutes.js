const multer = require('multer');
const { Router } = require('express');
const straysController = require('../controllers/straysController');
const path = require('path');
const fsExtra = require('fs-extra');
const { requireAuth } = require('../middlewares/authMiddleware');

const router = Router();

// this is defining the folderpath where to receive the path
let folderPath = 'public/pics';
let files = fsExtra.readdirSync(folderPath);
let numberOfFiles = files.length;
// defining the storage where the images are uploaded by the users
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, folderPath);
    },
    filename: (req, file, cb) => {
      cb(null, String(numberOfFiles + 1) + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

router.post('/adopt', straysController.adopt_post);
router.get('/create', requireAuth, straysController.upload_get);
router.post('/create', upload.single('img'), straysController.upload_post);
router.put('/admin/stray/approve-adoption', straysController.adopt_approve_put);
router.put('/admin/stray/approve-stray', straysController.stray_approve_put);
router.delete('/admin/stray/delete', straysController.stray_delete);

module.exports = router;