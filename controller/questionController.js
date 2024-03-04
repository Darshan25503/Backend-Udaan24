const marksModel = require("../model/marksModel");
const questionModel = require("../model/questionModel");

//fetching quiz
exports.quizController = async (req, res) => {
  try {
    const { eid } = req.params;
    const questions = await questionModel.find({ eventId: eid });
    res.status(200).json({
      success: true,
      message: "Question fetched successfully",
      questions,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//calculate marks

exports.calculateMarksController = async (req, res) => {
  try {
    const { userId, eventId, selectedOptions } = req.body;

    // Retrieve all questions with the same event ID
    const questions = await questionModel.find({ eventId });

    // Calculate total marks
    let totalMarks = 0;
    questions.forEach((question, index) => {
      if (selectedOptions[index] === question.correctAns) {
        totalMarks++;
      }
    });

    const reEntry = await marksModel.findOne({
      userId: userId,
      eventId: eventId,
    });
    if (reEntry) {
      return res.status(206).json({
        success: false,
        message: "Quiz already submitted",
      });
    }
    const quizData = await new marksModel({
      userId: userId,
      eventId: eventId,
      marks: totalMarks,
    }).save();

    // Send total marks as response
    res.status(200).json({
      success: true,
      message: "Quiz Submitted Successfully",
      quizData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};
