const config = {
    serverProtocol : process.env.SERVER_PROTOCOL || 'http',
    serverHost : process.env.SERVER_HOST || '192.168.86.114',
    serverPort : process.env.SERVER_PORT || '3000'
};

module.exports = config;