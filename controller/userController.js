const userModel = require("../model/userModel");
const JWT = require("jsonwebtoken");

//Register User Controller
exports.registerUserController = async (req, res) => {
  try {
    const { name, idNo, mobile, email, password, college } = req.body;
    const exUser = await userModel.findOne({ email: email.toLowerCase() });
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
      email: email.toLowerCase(),
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

//Login User Controller

exports.loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await userModel.findOne({
      email: email.toLowerCase(),
    });

    if (!existingUser) {
      return res.status(200).json({
        success: false,
        message: "Invalid username or password a",
      });
    }

    if (password !== existingUser.password) {
      return res.status(200).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    //JWT generation

    const token = await JWT.sign(
      { _id: existingUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      success: true,
      message: "User Login Successful",
      token,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error in user login" });
  }
};

//fetch users

exports.fetchUserController = async (req, res) => {
  try {
    const data = await userModel.find();
    res.status(200).json({
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
