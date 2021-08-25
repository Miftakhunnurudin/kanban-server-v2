const KanbanController = require('../controllers/KanbanController')
const {connect} = require('../config/mongodb')
const fs = require('fs')

connect().then(async ()=>{
    try {
        const kanban = await KanbanController.createKanban({title: 'demo', ownerId: 123})
        console.log(kanban.id)
        // let data = await fs.readFile("dummy_data.json", "utf8");
        // data = JSON.parse(data)
    } catch (error) {
        console.log(error)
    }
})
