const userModel = require("../model/userModel");

exports.checkPointsController = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await userModel.findById(uid);
    const points = user.points;
    const name = user.name;
    const idNo = user.idNo;
    const _id = user._id;
    let nightCount = 0;

    if (points < 100) {
      nightCount = 0;
    } else if (points > 100 && points < 150) {
      nightCount = 1;
    } else if (points > 150) {
      nightCount = 2;
    }

    res.status(200).json({
      success: true,
      nightCount,
      name,
      idNo,
      _id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server",
    });
  }
};
