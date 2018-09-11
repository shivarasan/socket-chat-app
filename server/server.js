const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { User } = require('./utils/users');

const publicPath =  path.join(__dirname, '../client');
const port = process.env.PORT || 3000;
const app = express();

const server = http.createServer(app);
const IO = socketIO(server);
const users = new User();
IO.on('connect', (socket)=> {
    socket.on('disconnect', () => {
        const user = users.removeUser(socket.id);
        if(user) {
            IO.to(user.room).emit('updatedUserList', users.getUserList(user.room));
            IO.to(user.room).emit('sendEmail', generateMessage('admin', `${user.name} has left`));
        }
    });
    socket.on('Join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required');
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        IO.to(params.room).emit('updatedUserList', users.getUserList(params.room));
        socket.emit('sendEmail', generateMessage('admin', 'welcome to chat app'));
        socket.broadcast.to(params.room).emit('sendEmail', generateMessage('admin', `${params.name} has joined to chat app`));

        callback();
    });
    socket.on('createEmail', (message, callback) => {
        const user = users.getUser(socket.id);
        if(user && isRealString(message.text)) {
            IO.to(user.room).emit('sendEmail', generateMessage(user.name, message.text));
        }
        callback();
    });
    socket.on('createLocation', function (obj) {
        const user = users.getUser(socket.id);
        if(user) {
            IO.to(user.room).emit('sendLocation', generateLocationMessage(user.name, obj.latitute, obj.longitute));
        }
    });
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log('server started');
});