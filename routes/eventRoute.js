const express = require("express");
const {
  fetchEventController,
  updateAttendeeController,
} = require("../controller/eventController");

const router = express.Router();

//GET || fetch all events
router.get("/fetch", fetchEventController);

//event attendence || POST

router.post("/attendence", updateAttendeeController);

module.exports = router;
