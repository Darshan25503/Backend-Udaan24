const orderModel = require("../model/orderModel");

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
