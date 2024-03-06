const express = require("express");
const {
  registerUserController,
  loginUserController,
  fetchUserController,
} = require("../controller/userController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

//POST || Register User
router.post("/register", registerUserController);

//POST || Login User
router.post("/login", loginUserController);

//GET || fetch users

router.get("/fetch", requireSignIn, isAdmin, fetchUserController);

module.exports = router;
