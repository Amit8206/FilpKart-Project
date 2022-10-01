const express = require("express");
const { requiresignin, adminMiddleware } = require("../common-middleware/middleware");
const { addCategory, getCategories, updateCategories, deleteCategories } = require("../controller/category");
const multer = require("multer")
const path = require("path")
const shortid = require("shortid")

const router = express.Router();


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function(req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})

const upload = multer({ storage })



router.post('/category/create', requiresignin, adminMiddleware, upload.single('categoryImage'), addCategory); // requiresignin, adminMiddleware,
router.get('/category/getcategory', getCategories);
router.post('/category/update', upload.array('categoryImage'), updateCategories); // requiresignin, adminMiddleware,
router.post('/category/delete', deleteCategories); // requiresignin, adminMiddleware,




module.exports = router;