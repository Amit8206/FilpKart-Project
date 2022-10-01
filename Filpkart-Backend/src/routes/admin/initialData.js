const express = require("express");
const { requiresignin, adminMiddleware } = require("../../common-middleware/middleware");
const { initialData } = require("../../controller/admin/initialData")



const router = express.Router();

router.post('/initialdata', requiresignin, adminMiddleware, initialData);



module.exports = router;