const express = require("express");
const {
  quizController,
  calculateMarksController,
} = require("../controller/questionController");

const router = express.Router();

//GET || fetch question event vise
router.get("/fetch-quiz/:eid", quizController);

//POST || marks calculation
router.post("/calculate-marks", calculateMarksController);
module.exports = router;
