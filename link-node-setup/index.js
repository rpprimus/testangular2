var express = require('express');
var socketIo = require('socket.io');
var http = require('http');
var config = require('./config');
var redis = require("redis");

var app = express();
var port = process.env.PORT || 3000;

var server = http.createServer(app);

var io = socketIo(server);

io.on('connect', (socket) => {
    const sub = redis.createClient(config.redisPort, config.redisHost);

    sub.on('message', function (channel, message) {
        console.log("Message: " + message + " on channel: " + channel + " is arrive!");
        io.emit('message', message);
    });

    console.log('Connected client on port %s.', port);

    // sub.subscribe('ORDER_STATUS_TYPES');
    socket.on("setChannel", function (data) {
        channel = data.channel;
        console.log("Got 'channel' from client, " + channel);
        sub.subscribe(channel); // hard code
    });

    socket.on('disconnect', () => {
        sub.unsubscribe();
        sub.quit();
        console.log('Client disconnected');
    });
});

server.listen(port, () => {
    console.log('Express server listening on port ' + port);
})