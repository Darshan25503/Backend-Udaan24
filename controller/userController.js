const userModel = require("../model/userModel");
const JWT = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const sendOTPEmail = require("../utils/otpMail");

//Register User Controller
exports.registerUserController = async (req, res) => {
  try {
    function generateOTP(length) {
      const digits = "0123456789";
      let otp = "";
      for (let i = 0; i < length; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
      }
      return otp;
    }

    // Usage example: Generate a digit-only OTP with 6 digits
    const otp = generateOTP(4);

    // Send OTP via email

    const { name, idNo, mobile, email, password, college } = req.body;
    const exUser = await userModel.findOne({ email: email.toLowerCase() });
    if (exUser) {
      if (exUser.isVerified === true) {
        return res.status(209).json({
          success: false,
          message: "User already exists",
        });
      } else {
        await sendOTPEmail(req.body.email, otp);
        // If user exists but is not verified, update the user details and resend OTP
        await userModel.findByIdAndUpdate(exUser._id, {
          name: name,
          idNo: idNo,
          password: password,
          otp: otp,
          college: college,
          mobile: mobile,
        });
      }
    } else {
      await sendOTPEmail(req.body.email, otp);
      // If user doesn't exist, create a new user
      const user = await new userModel({
        name: name,
        idNo: idNo,
        password: password,
        otp: otp,
        email: email.toLowerCase(),
        college: college,
        mobile: mobile,
      }).save();
      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
//otp verifiaction and token generation
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP " });
    }

    // Update isVerified variable
    user.isVerified = true;
    await user.save();

    res
      .status(200)
      .json({ message: "OTP verified successfully. Account verified." });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Internal server error" });
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
        message: "Invalid username or password",
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
    res.cookie("token", token, {
      maxAge: 86400000,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
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
