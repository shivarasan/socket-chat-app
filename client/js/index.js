var socket = io();

function scrollToBotten() {
    const messages = jQuery('#messages');
    const newMessage = messages.children('li:last-child');
    const clientHeight = messages.prop('clientHeight');
    const scrollTop = messages.prop('scrollTop');
    const scrollHeight = messages.prop('scrollHeight');
    const newMessageHeight = newMessage.innerHeight();
    const lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight+ lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}
socket.on('connect', function ()  {
    console.log(" server socket connected");
    socket.emit('sendEmail', { text:'sivarasan', from: 'dsf@gmail.com'})
});

socket.on('disconnect', function () {
  console.log("server disconnect");
});

socket.on('sendEmail', function (email) {
    const formatedTime = moment(email.createdAt).format('h:mm a');
    const template = jQuery('#message-template').html();
    const html = Mustache.render(template, {
        text: email.text,
        from: email.from,
        createdAt: formatedTime
    });
    jQuery('#messages').append(html);
    scrollToBotten();
    // console.log(email);
    // var li = jQuery('<li></li>');
    // li.text(`${email.from}:${email.text} ${moment(email.createdAt).format('h:mm a')}`);
    // jQuery('#messages').append(li);
});
socket.on('replayEmail', function (email) {
    console.log(email);
});


jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    let sendMessage= jQuery('[name=message]');
    socket.emit('createEmail',{
        from: 'user',
        text: sendMessage.val()
    }, function () {
        sendMessage.val('');
    });
});

socket.on('sendLocation', function (msg) {
    const formatedTime = moment(msg.createdAt).format('h:mm a');
    const template = jQuery('#location-message-template').html();
    const html = Mustache.render(template, {
        url: msg.message,
        from: msg.from,
        createdAt: formatedTime
    });
    jQuery('#messages').append(html);
    scrollToBotten();
    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My Current Location</a>');
    // li.text(`${msg.from}:`);
    // a.attr('href', msg.message);
    // li.append(a);
    // li.append(`${moment(msg.createdAt).format('h:mm a')}`);
    // jQuery('#messages').append(li);

});
var sendLocation = jQuery('#send-location');
sendLocation.on('click', function () {
    if(!navigator.geolocation) {
        return alert('your brower doesn\'t support to geolocation');
    }
    sendLocation.attr('disabled', 'disabled').text('Sending Location');
    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);
        socket.emit('createLocation',{
            latitute: position.coords.latitude,
            longitute: position.coords.longitude,
        });
        sendLocation.removeAttr('disabled').text('Send Location');

    }, function () {
      alert('unable to access the location');
      sendLocation.removeAttr('disabled').text('Send Location');
    })

});