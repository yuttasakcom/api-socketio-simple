const http = require('http')
const socketIO = require('socket.io')

const app = require('./app')

const server = http.createServer(app)
const io = socketIO(server)
const redis = require('redis')
const redisAdapter = require('socket.io-redis')

const redisHost = process.env.REDIS_HOST || 'localhost'
const redisPort = process.env.REDIS_PORT || '6379'

const pub = redis.createClient(redisPort, redisHost)
const sub = redis.createClient(redisPort, redisHost)

io.adapter(redisAdapter({ pubClient: pub, subClient: sub }))

require('./sockets')(io)

server.listen(app.get('port'), err => {
  if (err) throw err

  console.log(`Server running at localhost:${app.get('port')}`)
})
