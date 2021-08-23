const socket = require('socket.io')
const server = require('../app')

const io = socket(server)

io.on('connection', (socket) => {
    socket.on('getKanban', () => {
        socket.emit('getKanban',{kanban:'kanban'})
    })

    socket.on('createTask', (task) => {
        io.emit('createdTask',{task})
    })

    socket.on("message", data => {
        console.log(data)
        io.emit('message',data)
    })
})

