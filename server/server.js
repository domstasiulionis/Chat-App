const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");

const router = require("./router");
const server = http.createServer(app);
const PORT = process.env.PORT || 3001;

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} has disconnected`);
  });
});

app.use(router);

server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
