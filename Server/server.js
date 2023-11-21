const io = require("socket.io")(3000, {
  cors: {
    origin: ['http://localhost:8080'],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on('sendMessage', message => {
    socket.broadcast.emit('reciveMessage', message)
    console.log(message)
  })
});
