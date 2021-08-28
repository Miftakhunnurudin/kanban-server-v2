const KanbanController = require('../controllers/KanbanController')
const {connect} = require('../config/mongodb')
const fs = require('fs')

connect().then(async ()=>{
    try {
        const kanban = await KanbanController.createKanban({title: 'demo', ownerId: 123})
        console.log(kanban.id)
        let data = fs.readFileSync("dummy_data.json", "utf8");
        data = JSON.parse(data)
        data.task.map(async (task,i) => {
            setTimeout(() => {
                const {columnId} = task
                delete task.columnId
                const result = KanbanController.createTask({id: kanban.id, newTask:task, columnId})
            },i*50)
        })
    } catch (error) {
        console.log(error)
    }
})
