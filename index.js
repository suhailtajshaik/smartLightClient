const config = require('./config');
const serverURL = config.serverProtocol + "://" + config.serverHost + ":" + config.serverPort;
const socket = require('socket.io-client')(serverURL);
const mapState = require("./util");
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var LED = new Gpio(4, 'out'); //use GPIO pin 4, and specify that it is output

process.on("SIGINT", () => {
    LED.unexport();
    process.exit();
});

socket.on("connect", function () {
    console.log("RASPBERRY PI : Connected to " + serverURL);
    socket.on("updateState", function (state) {
        console.log("RASPBERRY PI Light is turned : ", state ? 'ON' : 'OFF');
        LED.writeSync(mapState[state]);
    });
});
