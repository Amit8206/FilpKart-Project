const express = require("express");
const { requiresignin, userMiddleware } = require("../common-middleware/middleware");
const { addItemToCart, getCartItems } = require("../controller/cart");


const router = express.Router();

router.post('/user/cart/addtocart', requiresignin, userMiddleware, addItemToCart);

router.post('/user/getCartItems', requiresignin, userMiddleware, getCartItems);



module.exports = router;