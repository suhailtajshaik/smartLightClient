const config = {
    serverProtocol : process.env.SERVER_PROTOCOL || 'https',
    serverHost : process.env.SERVER_HOST || 'smart-light-server.herokuapp.com',
    serverPort : process.env.SERVER_PORT || '80'
};

module.exports = config;