const express = require('express');
const { upload, requiresignin, adminMiddleware } = require('../../common-middleware/middleware');
// const { createProduct } = require('../../controller/product');
const { createPage, getPage } = require('../../controller/admin/page');
const router = express.Router();

router.post(`/page/create`, requiresignin, adminMiddleware, upload.fields([
    { name: 'banners' },
    { name: 'products' }
]), createPage);

router.get(`/page/:category/:type`, getPage);

module.exports = router;