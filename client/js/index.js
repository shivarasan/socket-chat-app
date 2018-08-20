var socket = io();
socket.on('connect', function ()  {
    console.log(" server socket connected");
    socket.emit('sendEmail', { text:'sivarasan', from: 'dsf@gmail.com'})
});

socket.on('disconnect', function () {
  console.log("server disconnect");
});

socket.on('sendEmail', function (email) {
    var li = jQuery('<li></li>');
    li.text(`${email.From}:${email.text}`);
    jQuery('#messages').append(li);
});
socket.on('replayEmail', function (email) {
    console.log(email);
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createEmail',{
        From: 'user',
        text: jQuery('[name=message]').val()
    });

});