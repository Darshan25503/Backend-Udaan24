const express = require("express");
const {
  checkPointsController,
  scanQR,
} = require("../controller/nightController");
const { requireSignIn } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/check-points/:uid", requireSignIn, checkPointsController);

router.post("/scanQR", scanQR);

module.exports = router;
