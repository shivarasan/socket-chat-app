const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const { generateMessage, generateLocationMessage } = require('./utils/message');

const publicPath =  path.join(__dirname, '../client');
const port = process.env.PORT || 3000;
const app = express();

const server = http.createServer(app);
const IO = socketIO(server);
IO.on('connect', (socket)=> {
    socket.on('disconnect', () => {
        console.log('client disconnected');
    });
    socket.emit('sendEmail', generateMessage('admin', 'welcome to chat app'));
    socket.broadcast.emit('sendEmail', generateMessage('admin', 'new user joined to chat app'));
    socket.on('createEmail', (obj, callback) => {
        IO.emit('sendEmail', obj);
        callback();
    });
    socket.on('createLocation', function (obj) {
        console.log(obj);
        IO.emit('sendLocation', generateLocationMessage('admin', obj.latitute,obj.longitute));
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log('server started');
});