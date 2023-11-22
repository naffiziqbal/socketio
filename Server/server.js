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
  res.send("Server is online");
});

io.on("connection", (socket) => {
  console.log("User Connected");
  console.log(socket.id);
  socket.on("sendMessage", (message, room) => {
    console.log(room, " room");
    socket.join(room)
    if (room === "" || null) {
      return;
    } else {
      socket.to(room).emit("reciveMessage", message);
    }
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log("Listerning on port"));

// app.res
module.export = app;
