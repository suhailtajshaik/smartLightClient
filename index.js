const socket = require('socket.io-client')("http://192.168.86.114:3000");

socket.on("connect", function () {
    console.log("Connected to server.")
    socket.on('upDateState', function(data){
        console.log("Light is turned : " , data.lightState ? 'ON':'OFF')
    });
});
