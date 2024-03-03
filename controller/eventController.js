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
