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
const http= require('http') ;
const {Server}=require('socket.io')
require('dotenv').config()
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "public")));
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000","https://enlancemagico.netlify.app/"]
  },
});
let activeUsers = [];
io.on("connection", (socket) => {
    // add new User
    socket.on("new-user-add", (newUserId) => {
        // if user is not added previously
        if (!activeUsers.some((user) => user.userId === newUserId)) {
            activeUsers.push({ userId: newUserId, socketId: socket.id });
            console.log("New User Connected", activeUsers);
        }
        // send all active users to new user
        io.emit("get-users", activeUsers);
    });
        // send message to a specific user
        socket.on("send-message", (data) => {
            const { receiverId } = data;
            const user = activeUsers.find((user) => user.userId === receiverId);
            console.log("Sending from socket to :", receiverId)
            console.log("Data: ", data)
            if (user) {
                io.to(user.socketId).emit("recieve-message", data);
            }
        });
    socket.on("disconnect", () => {
        // remove user from active users
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
        console.log("User Disconnected", activeUsers);
        // send all active users to all users
        io.emit("get-users", activeUsers);
    });



})
app.use(morgan('dev'))
app.use(
  cors({
    origin: [
      "http://localhost:3000","https://enlancemagico.netlify.app/"
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
server.listen(5000, () => {
  console.log("Server running on port 5000");
});

