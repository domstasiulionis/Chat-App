const express = require("express");
const http = require("http");
const PORT = 3001;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("New connection");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.use(router);

server.listen(PORT, () => {
  console.log(`Server running on port:  ${PORT}`);
});
