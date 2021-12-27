const express = require('express')
const app = express()
const port = 3000
const router = express.Router()

app.get('/', (req,res)=>{
    res.send('ok')
})

app.get('/test', (req,res)=>{
    res.send({
        status: 200,
        message: 'ok'
    })
})

var time = new Date();

app.get('/time', (req,res)=>{
    res.send({
        status:200,
        message: `${time.getHours()}:${time.getMinutes()}`
    })
})

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
  }) 
