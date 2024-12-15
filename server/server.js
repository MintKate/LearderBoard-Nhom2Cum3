const express = require('express')
const app = express()
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose()

app.use(cors())
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    next()
})

app.use(express.json({limit: '20mb'}))

app.post('/validate')

app.listen(5173, () => console.log('Listening at port 5173'))
