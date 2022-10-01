const express = require("express");
const { requiresignin, adminMiddleware } = require("../../common-middleware/middleware");
const {
  updateOrder,
  getCustomerOrders,
} = require("../../controller/admin/order");
const router = express.Router();

router.post(`/order/update`, requiresignin, adminMiddleware, updateOrder);
router.post(
  `/order/getCustomerOrders`,
  requiresignin,
  adminMiddleware,
  getCustomerOrders
);

module.exports = router;