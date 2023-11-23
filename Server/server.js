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

io.on("connection", async (socket) => {
  // socket.on("sending-room", (room) => {
  //   socket.join(room);
  //   console.log("User Connected on ", room);
  // });

  console.log(socket.id);
  socket.on("sendMessage", (message, room) => {
    console.log(room)
    console.log(message)
    socket.join(room)
    if (room === "" || null) {      return;
    } else {
      socket.to(room).emit("reciveMessage", message);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listerning on port ${PORT}`));

// app.res
module.export = app;
