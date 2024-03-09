const redCarpetModel = require("../model/redCarpetModel");
const userModel = require("../model/userModel");

exports.voteController = async (req, res) => {
  try {
    const { pid } = req.body;
    const userId = await req.user._id;
    const user = await userModel.findById(userId);
    if (user.isVoted) {
      return res.status(400).json({
        success: false,
        message: "You already voted",
      });
    } else {
      for (const _id of pid) {
        // Find the document by ID and increment the noOfVotes field by 1
        await redCarpetModel.findByIdAndUpdate(_id, { $inc: { noOfVotes: 1 } });
      }
      (user.isVoted = true), await user.save();
      return res.status(200).json({
        success: true,
        message: "Votes are submitted",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
