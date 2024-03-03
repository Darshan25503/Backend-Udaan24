const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      option: {
        type: String,
        required: true,
      },
    },
  ],
  correctAns: {
    type: Number,
    required: true,
  },
  eventId: {
    type: String,
    ref: "event",
    required: true,
  },
  isTrue: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("question", questionSchema);
