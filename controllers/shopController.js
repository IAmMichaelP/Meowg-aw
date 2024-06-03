const Merch = require('../models/merch');
const Cart = require('../models/cart');
const Checkout = require('../models/checkout');
const url = require('url');
const Purchase = require('../models/purchase');

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

module.exports.checkout_get = async (req, res) => {
    try{
        const user = req.params.id;
        let checkout = await Checkout.findCheckout(user);
        
        res.render('checkout', { title: 'Checkout', checkout: checkout });
    } catch {
        res.render('500');
    }

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

module.exports.checkout_item_post = async (req, res) => {
	try {
        const userId = req.body.user; // Access user ID from req.body
        const selectedItems = req.body.selectedItems;
        let total = 0;
        const itemsToPurchase = [];

        // Iterate through selected items and calculate total price
        for (const item of selectedItems) {
            const merch = await Merch.findById(item.itemId);
            const amount = Number(item.amount);

            if (merch && merch.quantity && amount > 0) {
                const itemTotalPrice = merch.price * amount;
                total += itemTotalPrice;

                itemsToPurchase.push({
                    merch: item.itemId,
                    amount: amount
                });
            }
        }

        // Save the checkout information to the database
        const checkout = new Checkout({
            user: userId,
            totalPrice: total,
            checkout: itemsToPurchase
        });

        await checkout.save();

        // Send the response back to the client
        res.status(200).json({ user: userId });
    } catch (error) {
        console.error('Error during checkout:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports.place_order_post = async (req, res) => {
	try {
        
        console.log(req.body);
        console.log("read from place order");
        const checkout = req.body.checkout;
        const user = req.body.user;

        const order = await Checkout.findById(checkout);
        let purchase = await Purchase.findOne({ user: user });
        let merchId = order.checkout[0].merch;
        const amount = order.checkout[0].amount;
        console.log(order);
        console.log("values: ", merchId, amount);

        // const itemIndex = purchase.purchase.findIndex(item => item.merch.toString() === merchId);
        purchase.totalPrice = order.totalPrice;
        purchase.purchase.push({
            merch: merchId,
            amount: amount,
            status: "pending approval"
        });


        await purchase.save();
        await Checkout.findByIdAndDelete(checkout);
        res.status(200).json({ user: req.body.user });
        
    } catch (error) {
        console.error('Error during checkout:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}