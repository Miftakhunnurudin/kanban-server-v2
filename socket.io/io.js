const socket = require('socket.io')
const server = require('../app')
const {connect} = require('../config/mongodb')
const KanbanController = require('../controllers/KanbanController')

const io = socket(server)

connect().then(()=>{
    io.on('connection', (socket) => {
        socket.on('getKanban', async (id) => {
            console.log(id)
            const kanban = await KanbanController.getOne(id)
            socket.emit('getKanban',{kanban})
        })
    
        socket.on('createTask', (task) => {
            io.emit('createdTask',{task})
        })
    
        socket.on("message", data => {
            console.log(data)
            io.emit('message',data)
        })
    })
})

