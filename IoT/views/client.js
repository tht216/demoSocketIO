var socket = io.connect('http://localhost:3000');

socket.on('connect', function() {
    socket.emit('adduser', prompt("Enter your name"));
});

socket.on('updatechat', function(username, data) {
    $('#conversation').append('<b>' + username + ':</b> ' + data + '<br>');
});

socket.on('updateusers', function(data) {
    $('#users').empty();
    $.each(data, function(key, value) {
        $('#users').append('<div>' + key + '</div>');
    });
});

$(function() {
    $('#datasend').click(function() {
        var message = $('#data').val();
        $('#data').val('');
        socket.emit('sendchat', message);
    });

    $('#data').keypress(function(e) {
        if (e.which == 13) {
            $(this).blur();
            $('#datasend').focus().click();
        }
    });
});