const config = require('./config');
const serverURL = config.serverProtocol + "://" + config.serverHost + ":" + config.serverPort;
var socket = require('socket.io-client')(serverURL);

socket.on("connect", function () {
    console.log("RASPBERRY PI : Connected to " + serverURL);

    socket.on("updateState", function (state) {
        console.log("RASPBERRY PI Light is turned : ", state ? 'ON' : 'OFF');
    });
});
