const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  idNo: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
  },
  role: {
    type: String,
    default: "user",
    required: true,
  },
});

module.exports = mongoose.model("user", userSchema);
