const express = require("express");
const { checkPointsController } = require("../controller/nightController");

const router = express.Router();

router.get("/check-points/:uid", checkPointsController);

module.exports = router;
