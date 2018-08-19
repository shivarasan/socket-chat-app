var socket = io();
socket.on('connect', function ()  {
    console.log(" server socket connected");
    socket.emit('sendEmail', { text:'sivarasan', from: 'dsf@gmail.com'})
});

socket.on('disconnect', function () {
  console.log("server disconnect");
});

socket.on('sendEmail', function (email) {
    console.log(email);
});