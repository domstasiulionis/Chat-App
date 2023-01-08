const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const PORT = 3001;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("New connection");

  socket.on("join", ({ room, name }) => {
    socket.join(room);
    console.log(`User with ID: ${socket.id} joined room: ${room}`);
  });

  socket.on("disconnected", () => {
    console.log("User has disconnected");
  });

  socket.on("send_message", (data) => {
    console.log(data);
  });
});

app.use(router);

server.listen(PORT, () => {
  console.log(`Server running on port:  ${PORT}`);
});
