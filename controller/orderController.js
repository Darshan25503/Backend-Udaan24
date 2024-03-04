const orderModel = require("../model/orderModel");
const userModel = require("../model/userModel");

exports.fetchOrderController = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.status(200).json({
      success: true,
      message: "Orders Fetched successfully",
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
exports.fetchSingleOrderController = async (req, res) => {
  try {
    const { oid } = req.params;
    const orders = await orderModel.findById({ _id: oid });
    res.status(200).json({
      success: true,
      message: "Orders Fetched successfully",
      orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//fetch user by event

exports.fetchUserByEventController = async (req, res) => {
  try {
    const { eid } = req.params;

    // Find orders with the given event ID
    const orders = await orderModel.find({ eventId: eid });

    // Extract user IDs from the orders
    const userIds = await orders.flatMap((order) => order.users);

    // Fetch user details based on the user IDs
    const users = await userModel
      .find({ _id: { $in: userIds } })
      .select("name mobile");

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
