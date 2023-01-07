const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const PORT = 5000;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connetion", (socket) => {
  console.log("New connection");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.use(router);

server.listen(PORT, () => {
  console.log(`Server running on port:  ${PORT}`);
});
