const express = require("express");
const {
  quizController,
  calculateMarksController,
} = require("../controller/questionController");
const { requireSignIn } = require("../middlewares/authMiddleware");

const router = express.Router();

//GET || fetch question event vise
router.get("/fetch-quiz/:eid", requireSignIn, quizController);

//POST || marks calculation
router.post("/calculate-marks", requireSignIn, calculateMarksController);
module.exports = router;
