const questionModel = require("../model/questionModel");
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
