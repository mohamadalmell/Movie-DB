<<<<<<< HEAD
=======
const express = require('express')
const app = express()
const port = 3000
const router = express.Router()

app.get('/', (req,res)=>{
    res.send('ok')
})

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
  }) 
>>>>>>> dd074d0 (Step 2)
