module.exports = io => {
  io.on('connection', socket => {
    console.log('New user connect')

    socket.on('newPost', msg => {
      console.log('newPost')
      io.emit('sendPost', msg)
    })

    socket.on('disconnect', () => {
      console.log('User was disconnected')
    })
  })
}
