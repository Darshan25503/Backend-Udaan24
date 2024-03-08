const express = require("express");
const {
  fetchEventController,
  updateAttendeeController,
  fetchEventByCategoryController,
} = require("../controller/eventController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

//GET || fetch all events
router.get("/fetch", requireSignIn, fetchEventController);

//event attendence || POST

router.post("/attendence", requireSignIn, isAdmin, updateAttendeeController);

//fetch event by category

router.get("/fetch-event-by-cat/:category", fetchEventByCategoryController);

module.exports = router;
