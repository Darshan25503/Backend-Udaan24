const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config({ path: "./my.env" });
const userRoute = require("./routes/userRoute");
const eventRoute = require("./routes/eventRoute");

//database config
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());

//user route
app.use("/api/v1/user", userRoute);

//event route
app.use("/api/v1/event", eventRoute);

//rest api
app.get("/", (req, res) => {
  res.json({
    message: "welcome to Global public API of Udaan24",
  });
});

//connection message
app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
