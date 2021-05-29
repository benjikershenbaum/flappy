const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  // ...
});

io.on('connection', (socket) => {
    console.log('a user connected');
    console.log({uuid});
    users.push({uuid});
    socket.emit('bird/me', {uuid});
    io.emit('bird/new', {uuid});

    socket.on('bird/me', (data) => {
      io.emit("/birds/listen", {uuid, data})
    })
    socket.on('disconnect', () => {
      io.emit('bird/leave', {uuid});
      users = users.filter((id)=>{
        return id != {uuid}
      });
      console.log('user disconnected');
    });
});

// server.listen(4000, "0.0.0.0", () => {
//   console.log('listening on *:4000');
// });

httpServer.listen(4000, "0.0.0.0");
