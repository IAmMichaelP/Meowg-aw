const Merch = require('../models/merch');
const Cart = require('../models/cart');

module.exports.shop_get = async (req, res) => {
    console.log("shop")
    const merches = await Merch.findAllMerch();
    res.render('shop', { title: 'SHOP', merches });
};

module.exports.shop_item_get = async (req, res) => {
    console.log("shop item get")
    try{
        const id = req.params.id;
        let merch = await Merch.findMerch(id);
        merch = merch[0];
        console.log(typeof(merch));
        
        res.render('shop-item', { title: 'Item Details', merch: merch });
    } catch {
        res.render('500');
    }
    
};

module.exports.checkout_get = (req, res) => {
	console.log("checkout");
    res.render('checkout', { title: 'Checkout' });
};

module.exports.sell_item_get = (req, res) => {
	console.log("checkout");
    res.render('add-item', { title: 'Add Item' });
};

module.exports.add_item_post = async (req, res) => {
    console.log("reading in item post");
	try{
        // defines image data into base64 string before saving into database
        let imageData = req.body.img;
        console.log("logggging");
        imageData = req.files.img.data.toString('base64');
        req.body.imgData = imageData;
        const user  = req.body.uploader;
        console.log(req.body);
        const merch = new Merch(req.body);
        merch.save()
            .then((result) => {
                res.status(200).json({ user: user });
            })       

    } catch(err) {
        console.log(err);

    }

};

module.exports.add_to_cart_put = async (req, res) => {
    console.log("called in add to cart put request");
    const { userId, merchId, amount } = req.body;
    console.log(req.body);

    if (!userId || !merchId || !amount) {
        return res.status(400).send('Missing required fields');
    }

    try {
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({
                user: userId,
                cart: []
            });
        }

        const itemIndex = cart.cart.findIndex(item => item.merch.toString() === merchId);

        if (itemIndex > -1) {
            cart.cart[itemIndex].amount += amount;
        } else {
            cart.cart.push({
                merch: merchId,
                amount: amount
            });
        }

        await cart.save();
        res.status(200).send('Item added to cart successfully');
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).send('Internal server error');
    }
}