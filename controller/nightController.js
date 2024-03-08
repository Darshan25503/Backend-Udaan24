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
    } else if (points > 100 && points < 200) {
      nightCount = 1;
    } else if (points > 200) {
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

//Qr Scanning

exports.scanQR = async (req, res) => {
  try {
    const { userId, night } = req.body;
    const user = await userModel.findById({ _id: userId });

    if (night === 1) {
      if (user.garba) {
        return res.status(206).json({
          success: false,
          message: "This QR code is Already used once",
        });
      } else {
        user.garba = true;
        await user.save();
        return res.status(200).json({
          success: true,
          message: "You are Welcome",
        });
      }
    } else if (night === 2) {
      if (user.edm) {
        return res.status(206).json({
          success: false,
          message: "This QR code is Already used once",
        });
      } else {
        user.edm = true;
        await user.save();
        return res.status(200).json({
          success: true,
          message: "You are Welcome",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
