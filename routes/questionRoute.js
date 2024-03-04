const express = require("express");
const { quizController } = require("../controller/questionController");

const router = express.Router();

//GET || fetch question event vise
router.get("/fetch-quiz/:eid", quizController);

module.exports = router;
