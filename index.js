const config = require('./config');
const serverURL = config.serverProtocol + "://" + config.serverHost + ":" + config.serverPort;
const socket = require('socket.io-client')(serverURL, { reconnection: false });
const mapState = require("./util");
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
var LED = new Gpio(4, 'out'); //use GPIO pin 4, and specify that it is output
let isAlive = false;
let LEDstatus;

process.on("SIGINT", () => {
    isAlive = false;
    socket.emit("HeartBeat" , { "isAlive": isAlive });
    process.exit(0);
});

socket.on("connect", function () {
    isAlive = true;
    socket.emit("HeartBeat", { "isAlive": isAlive });

    console.log("RASPBERRY PI : Connected to " + serverURL);
    socket.on("updateState", function (state) {
        LEDstatus = state;
        socket.emit("LEDstatus", LEDstatus);
        console.log("RASPBERRY PI Light is turned : ", state ? 'ON' : 'OFF');
        LED.writeSync(mapState[state]);
    });

    socket.on('disconnect', function () {
        isAlive = false;
        console.log("PI Disconnected");
        socket.emit("HeartBeat", { "isAlive": isAlive });
    });

    socket.on("checkLedState", function(req) {  
        LED.read(function (err, value) {
            if (err) {
                LEDstatus = { "error": err }
            }
            LEDstatus = {"status": mapState[value]};
            socket.emit("HeartBeat", { "isAlive": isAlive, "status": mapState[value] });
            socket.emit("LEDstatus", LEDstatus);
        });
    })
});