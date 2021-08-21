const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')

app.use(express())
app.use(cors)

const server = app.listen(port, ()=> {
    console.log('listening port', port)
})

module.exports = server