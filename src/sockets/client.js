const socket = require('socket.io-client')

const host = process.env.HOST || 'http://localhost'
const port = process.env.PORT || '3000'

module.exports = socket(`${host}:${port}`)
