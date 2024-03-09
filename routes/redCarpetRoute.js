const express = require("express");
const { voteController } = require("../controller/redCarpetController");
const { requireSignIn } = require("../middlewares/authMiddleware");

const router = express.Router();

//vote

router.post("/vote", requireSignIn, voteController);

module.exports = router;
