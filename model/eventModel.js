const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
  },
  eventId: {
    type: String,
    required: true,
  },
  eventPrice: {
    type: Number,
    required: true,
  },
  noOfParticipants: {
    type: Number,
    required: true,
  },
  eventImage: {
    type: String,
    required: true,
  },
  eventManager: {
    type: String,
    ref: "user",
    required: true,
  },
  eventDetail: [
    {
      roundDesc: {
        type: String,
        required: true,
      },
      roundTime: {
        type: Date,
        required: true,
      },
      roundVenue: {
        type: String,
        required: true,
      },
    },
  ],
  attendee: [
    {
      userId: {
        type: String,
        ref: "user",
      },
      roundNo: {
        type: Number,
        default: 0,
      },
    },
  ],
});

module.exports = mongoose.model("event", eventSchema);
