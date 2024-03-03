const express = require("express");
const { fetchEventController } = require("../controller/eventController");

const router = express.Router();

//GET || fetch all events
router.get("/fetch", fetchEventController);

module.exports = router;
