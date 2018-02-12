const config = require('./config');

const serverURL = config.serverProtocol + "://" + config.serverHost + ":" + config.serverPort;
const socket = require('socket.io-client')(serverURL);
var gpio = require('rpi-gpio');
gpio.setup(4, gpio.DIR_OUT, write(4, true));

process.on("SIGINT", () => {
    gpio.write(4, true, () => {
        gpio.distroy(() => {
            process.exit();
        });
    });
});

function write(pinNo, value) {
    // pinNo  =  GPIO pin no
    // value  = true => OFF
    // value  = false => ON
    gpio.write(pinNo, value, function (err) {
        if (err) throw err;
        console.log('Written to pin ' + pinNo);
    });
}

socket.on("connect", function () {
    console.log("RASPBERRY PI : Connected to " + serverURL);
    socket.on("updateState", function (state) {
        console.log("RASPBERRY PI Light is turned : ", state ? 'ON' : 'OFF');
        write(4, !state);
    });
});
