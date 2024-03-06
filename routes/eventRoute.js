const express = require("express");
const {
  fetchEventController,
  updateAttendeeController,
} = require("../controller/eventController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

//GET || fetch all events
router.get("/fetch", requireSignIn, fetchEventController);

//event attendence || POST

router.post("/attendence", requireSignIn, isAdmin, updateAttendeeController);

module.exports = router;
