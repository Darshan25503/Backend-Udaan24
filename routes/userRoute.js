const express = require("express");
const {
  registerUserController,
  loginUserController,
  fetchUserController,
  verifyOTP,
} = require("../controller/userController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

//POST || Register User
router.post("/register", registerUserController);

//POST || Login User
router.post("/login", loginUserController);

//GET || fetch users
router.get("/fetch", requireSignIn, isAdmin, fetchUserController);

//POST || OTP verification
router.post("/verifyOTP", verifyOTP);

module.exports = router;
