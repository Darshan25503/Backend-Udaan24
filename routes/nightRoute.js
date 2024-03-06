const express = require("express");
const { checkPointsController } = require("../controller/nightController");
const { requireSignIn } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/check-points/:uid", requireSignIn, checkPointsController);

module.exports = router;
