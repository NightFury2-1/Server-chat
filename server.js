const express = require("express");
require("dotenv").config();
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());
const FrontEndUrl = process.env.FRONTEND;
const Port = process.env.PORT;
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: FrontEndUrl,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // console.log(`User connected ${socket.id}`);
  socket.on("join_room", (data) => {
    socket.join(data);
    // console.log(`User with ID ${socket.id} joined room: ${data}`);
  });
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
  socket.on("disconnect", () => {
    // console.log("User disconnected", socket.id);
  });
});

server.listen(Port, () => {
  console.log("Server Running");
});
