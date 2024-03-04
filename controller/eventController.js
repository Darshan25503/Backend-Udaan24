const eventModel = require("../model/eventModel");

exports.fetchEventController = async (req, res) => {
  try {
    const events = await eventModel.find();
    res.status(200).json({
      success: true,
      message: "Events Fetched Successfully",
      events,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

// attendence

exports.updateAttendeeController = async (req, res) => {
  try {
    const { eventId, userId } = req.body;

    // Find the event document by its ID
    const event = await eventModel.findById({ _id: eventId });

    // Check if the event exists
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Find the maximum roundNo for the given userId in the attendee array
    let maxRoundNo = 0;
    event.attendee.forEach((entry) => {
      if (entry.userId === userId && entry.roundNo > maxRoundNo) {
        maxRoundNo = entry.roundNo;
      }
    });

    // Increment the maximum roundNo by one
    const roundNo = maxRoundNo + 1;

    // Update the attendee array by adding a new object
    const updatedEvent = await eventModel.findByIdAndUpdate(
      eventId,
      { $push: { attendee: { userId, roundNo } } },
      { new: true } // Return the updated document
    );

    res.status(200).json({
      success: true,
      message: "Attendee information added successfully",
      updatedEvent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
