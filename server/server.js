const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');

const publicPath =  path.join(__dirname, '../client');
const port = process.env.PORT || 3000;
const app = express();

const server = http.createServer(app);
const IO = socketIO(server);
IO.on('connect', (socket)=> {
    socket.on('disconnect', () => {
        console.log('client disconnected');
    });
    socket.on('Join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and room name are required');
        }
        socket.join(params.room);
        socket.emit('sendEmail', generateMessage('admin', 'welcome to chat app'));
        socket.broadcast.to(params.room).emit('sendEmail', generateMessage('admin', `${params.name} has joined to chat app`));

        callback();
    });
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