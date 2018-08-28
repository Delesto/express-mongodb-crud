module.exports = {
    app: {
        port: 3000,
        url: '127.0.0.1'
    },
    mongoose: {
        url: 'mongodb://localhost:27017/nodeApp'
    },
    session: {
        secret: 'expressApp'
    }
}