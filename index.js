const config = require('./config');
const serverURL = config.serverProtocol + "://" + config.serverHost + ":" + config.serverPort;
const socket = require('socket.io-client')(serverURL,{ reconnection: false });
const mapState = require("./util");
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO


process.on("SIGINT", () => {
    socket.emit("PiDisconnect");
    process.exit(0);
});

socket.on("connect", function () {
    console.log("RASPBERRY PI : Connected to " + serverURL);
    socket.on("updateState", function (state) {
        console.log("RASPBERRY PI Light is turned : ", state ? 'ON' : 'OFF');
        triggerIO(4,state);
    });

    socket.on('disconnect', function() {
        console.log("PI Disconnected");
        socket.emit("PiDisconnect");
    });
});

function triggerIO(pin,state) {
    var LED = new Gpio(pin, 'out'); //use GPIO pin 4, and specify that it is output
    LED.writeSync(mapState[state]);
    LED.unexport();
}