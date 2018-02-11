var socket = require('socket.io-client')("http://localhost:3000");

socket.on("connect", function () {
    console.log("RASPBERRY PI : Connected to server");

    socket.on("updateState", function (state) {
        console.log("RASPBERRY PI Light state : ", state);
    });

});
