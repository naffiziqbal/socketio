const express = require("express");
const socketIo = require("socket.io");
const http = require("http");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());

app.get("/", (req, res) => {
  res.send("server is online");
});


io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("sendMessage", (message, room) => {
    console.log(room, " room");
    if (room === "") {
      socket.broadcast.emit("reciveMessage", message);
    } else {
      socket.to(room).emit("reciveMessage", message);
    }

    console.log(message);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log("Listerning on port"));

// app.res
module.exports = app;
