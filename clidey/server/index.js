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
    socket.emit('bird/new', uuid);

    socket.on('bird/me', () => {

    })
    socket.on('disconnect', () => {
      socket.emit('bird/leave', uuid)
      console.log('user disconnected');
    });
});

server.listen(4000, "0.0.0.0", () => {
  console.log('listening on *:4000');
});