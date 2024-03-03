const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  users: [
    {
      userId: {
        type: String,
        ref: "user",
        required: true,
      },
    },
  ],
  eventId: {
    type: String,
    ref: "event",
    required: true,
  },
  paymentMode: {
    type: String,
    required: true,
  },
  paymentRef: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("order", orderSchema);
