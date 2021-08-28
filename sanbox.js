const KanbanController = require('./controllers/KanbanController')
const {connect} = require('./config/mongodb')

connect().then(()=>{
    KanbanController.getOne("612a4cf473d2880af079ef02")
        .then((data)=>{console.log(data)})
        .catch(console.error)
  })
