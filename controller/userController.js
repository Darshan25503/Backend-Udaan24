const userModel = require("../model/userModel");

exports.registerUserController = async (req, res) => {
  try {
    const { name, idNo, mobile, email, password, college } = req.body;
    const exUser = await userModel.findOne({ email });
    if (exUser) {
      return res.status(209).json({
        success: false,
        message: "User already exists",
      });
    }
    const user = await new userModel({
      name: name,
      idNo: idNo,
      password: password,
      email: email,
      college: college,
      mobile: mobile,
    }).save();
    res.status(201).json({
      success: true,
      message: "User registerd successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
