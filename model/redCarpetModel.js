const mongoose = require("mongoose");

const redCarpetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  noOfVotes: {
    type: Number,
    default: 0,
    required: true,
  },
});

module.exports = mongoose.model("redCarpet", redCarpetSchema);
