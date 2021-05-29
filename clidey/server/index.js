const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { v4 } = require('uuid');

const users = [];

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    users.push({ uuid });
    socket.emit('bird/me', {uuid});
    io.emit('bird/new', {uuid});

    socket.on('bird/me', (data) => {
      io.emit("/birds/listen", { uuid, data})
    })
    socket.on('disconnect', () => {
      io.emit('bird/leave', {uuid})
      console.log('user disconnected');
    });
});

server.listen(4000, "0.0.0.0", () => {
  console.log('listening on *:4000');
});