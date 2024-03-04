const express = require("express");
const {
  fetchOrderController,
  fetchSingleOrderController,
} = require("../controller/orderController");

const router = express.Router();

//GET || Fetch all orders

router.get("/fetch-orders", fetchOrderController);
router.get("/fetch-single-orders/:oid", fetchSingleOrderController);

module.exports = router;
