const multer = require('multer');
const { Router } = require('express');
const straysController = require('../controllers/straysController');
const path = require('path');
const fsExtra = require('fs-extra');
const { requireAuth } = require('../middlewares/authMiddleware');

// defining storage 
let folderPath = 'public/pics';
let files = fsExtra.readdirSync(folderPath);
let numberOfFiles = files.length;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, folderPath);
    },
    filename: (req, file, cb) => {
        cb(null, String(numberOfFiles + 1) + path.extname(file.originalname));
    }
});
const upload = multer({storage: storage});

const router = Router();

router.post('/adopt', straysController.adopt_post);
router.get('/create', requireAuth, straysController.upload_get);
router.post('/create', upload.single('input-file'), straysController.upload_post);

module.exports = router;