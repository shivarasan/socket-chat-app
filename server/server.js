const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io')

const publicPath =  path.join(__dirname, '../client');
const port = process.env.PORT || 3000;
const app = express();

const server = http.createServer(app);
const IO = socketIO(server);
IO.on('connect', (socket)=> {
    socket.on('disconnect', () => {
        console.log('client disconnected');
    });
    socket.on('sendEmail', (email) => {
        console.log(email);
    });
    socket.emit('sendEmail', { from: 'sivarasan', Text: 'hai how are you'});
});

app.use(express.static(publicPath));

server.listen(port, () => {
    console.log('server started');
});