const express = require('express')
const PORT = process.env.PORT || 3000
const app = express()
const http = require('http')



const io = require("socket.io")(PORT, {
  cors: {
    origin: ["http://localhost:8080"],
  },
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

const server = http.createServer((req,res)=>{
    res.writeHead(200, {'Content-Type' : 'text/plain'})
    res.end("Online")
})
server.listen(PORT)
module.exports=app
