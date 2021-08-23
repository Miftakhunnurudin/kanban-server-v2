const KanbanController = require('./controllers/KanbanController')
const {connect} = require('./config/mongodb')

connect().then(()=>{
    KanbanController.getAll()
        .then((data)=>{console.log(data)})
        .catch(console.error)
  })
