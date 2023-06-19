const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dbConnect = require("./config/conn.js");
const cookieParser = require("cookie-parser");
const path = require("path");
const userRoute=require('./routes/userRouter.js')
const adminRoutes=require('./routes/adminRouter.js')
const superadminRoutes=require('./routes/superadminRouter.js')
const morgan = require('morgan')
const app = express();
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

// app.post("/vendor/vendor" , (req , res) =>{
//   res.json({message : "vendeoaoijao"})
// })

app.use("/vendor", adminRoutes);
app.use("/superadmin", superadminRoutes);
app.use('/',userRoute);
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

