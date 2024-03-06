const express = require("express");
const {
  fetchOrderController,
  fetchSingleOrderController,
  fetchUserByEventController,
} = require("../controller/orderController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

//GET || Fetch all orders

router.get("/fetch-orders", requireSignIn, isAdmin, fetchOrderController);

//GET || fetch single order

router.get(
  "/fetch-single-orders/:oid",
  requireSignIn,
  fetchSingleOrderController
);

// POST || fetch users by event

router.get(
  "/fetch-users/:eid",
  requireSignIn,
  isAdmin,
  fetchUserByEventController
);

module.exports = router;
