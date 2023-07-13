const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dbConnect = require("./config/conn.js");
const cookieParser = require("cookie-parser");
const path = require("path");
const userRoute=require('./routes/userRouter.js')
const adminRoutes=require('./routes/adminRouter.js')
const superadminRoutes=require('./routes/superadminRouter.js')
const ChatRoutes=require('./routes/ChatRouter.js')
const MessageRoutes=require('./routes/MessageRouter.js')
const morgan = require('morgan');
const app = express();
require('dotenv').config()
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "public")));

app.use(morgan('dev'))
app.use(
  cors({
    origin: [
      "http://localhost:3000",
    ],
    credentials: true,
  })
);

dbConnect();

app.use("/vendor", adminRoutes);
app.use("/superadmin", superadminRoutes);
app.use("/chat",ChatRoutes);
app.use("/message",MessageRoutes);
app.use('/',userRoute);
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

