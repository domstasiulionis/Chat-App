const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const router = require("./router");
const PORT = 3001;

io.on("connection", (socket) => {
  console.log("New connection");

  socket.on("join", ({ room, name }) => {
    socket.join(room);
    console.log(`User with ID: ${socket.id} joined room: ${room}`);
  });

  socket.on("disconnected", () => {
    console.log("User has disconnected");
  });
});

app.use(router);

server.listen(PORT, () => {
  console.log(`Server running on port:  ${PORT}`);
});
