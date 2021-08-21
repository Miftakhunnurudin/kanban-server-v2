const socket = require('socket.io')
const server = require('../app')

const io = socket(server)

io.on('conncetion', (socket) => {
    socket.on('getKanban', () => {
        socket.emit('getKanban',{kanban:'kanban'})
    })

    socket.on('createTask', (task) => {
        io.emit('createdTask',{task})
    })
})

