const orderModel = require("../model/orderModel");
const userModel = require("../model/userModel");

//create order controller
exports.createOrderController = async (req, res) => {
  try {
    const { users, eventId, paymentMode, paymentRef, price } = req.body;
    // Check for duplicate users and validate existence
    const existingUsers = await userModel.find({ email: { $in: users } });
    if (existingUsers.length !== users.length) {
      return res
        .status(400)
        .json({ success: false, message: "One or more users do not exist" });
    }
    const userIds = existingUsers.map((user) => user._id);

    // Check if an order already exists for the same event and users
    const existingOrder = await orderModel.findOne({
      eventId: eventId,
      users: { $all: userIds },
    });

    if (existingOrder) {
      return res.status(400).json({
        success: false,
        message: "Order already exists for the same event and users",
      });
    }
    // Create order
    const order = new orderModel({
      users: existingUsers.map((user) => user._id), // Use user IDs
      eventId: eventId,
      paymentMode: paymentMode,
      paymentRef: paymentRef,
      price: price,
    });
    await order.save();

    res
      .status(201)
      .json({ success: true, message: "Order created successfully", order });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//fetch order controller
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
