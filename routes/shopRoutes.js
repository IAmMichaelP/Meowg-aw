const { Router } = require('express');
const shopController = require('../controllers/shopController');
const { requireAuth } = require('../middlewares/authMiddleware');
const path = require('path');
const fsExtra = require('fs-extra');
const fileUpload = require('express-fileupload');
const multer = require('multer');

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

router.get('/shop', shopController.shop_get);
router.get('/shop-item/:id', shopController.shop_item_get);
router.get('/checkout/:id', requireAuth, shopController.checkout_get);
router.get('/sell-item', requireAuth, shopController.sell_item_get); 
router.post('/shop/add-item', fileUpload('img'), shopController.add_item_post); 
router.put('/add-to-cart', shopController.add_to_cart_put); 
router.post('/checkout-item', shopController.checkout_item_post); 
router.put('/place-order', shopController.place_order_post); 

module.exports = router;