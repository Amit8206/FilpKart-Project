const express = require("express");
const { requiresignin, adminMiddleware } = require("../common-middleware/middleware");
const { createProduct, getProductsBySlug, getProductDetailsById } = require("../controller/product");
const Category = require("../models/category");

const multer = require("multer")
const shortid = require("shortid")
const path = require("path")


const router = express.Router();


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function(req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})

const upload = multer({ storage })




router.post('/product/create', requiresignin, adminMiddleware, upload.array('productPictures'), createProduct);
router.get('/products/:slug', getProductsBySlug);
router.get('/product/:productId', getProductDetailsById);



module.exports = router;