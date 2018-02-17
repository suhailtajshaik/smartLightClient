const config = {
    serverProtocol : process.env.SERVER_PROTOCOL || 'https',
    serverHost : process.env.SERVER_HOST || 'peaceful-chamber-94125.herokuapp.com',
    serverPort : process.env.SERVER_PORT || '80'
};

module.exports = config;