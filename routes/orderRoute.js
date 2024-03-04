const express = require("express");
const {
  fetchOrderController,
  fetchSingleOrderController,
  fetchUserByEventController,
} = require("../controller/orderController");

const router = express.Router();

//GET || Fetch all orders

router.get("/fetch-orders", fetchOrderController);

//GET || fetch single order

router.get("/fetch-single-orders/:oid", fetchSingleOrderController);

// POST || fetch users by event

router.get("/fetch-users/:eid", fetchUserByEventController);

module.exports = router;
