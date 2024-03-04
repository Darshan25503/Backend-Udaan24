const mongoose = require("mongoose");

const marksSchema = new mongoose.Schema({
  marks: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    ref: "user",
    required: true,
  },
  eventId: {
    type: String,
    ref: "event",
    required: true,
  },
});

module.exports = mongoose.model("marks", marksSchema);
