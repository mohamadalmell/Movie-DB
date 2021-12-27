const express = require('express')
const app = express()
const port = 3000
const router = express.Router()

const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب', year: 1992, rating: 6.2 }
]

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

app.get('/hello', (req,res)=>{
    res.send({
        status:200,
        message: `Hello`
    })
})

app.get('/hello/:id', (req,res)=>{
    res.send({
        status:200,
        message: `Hello ${req.params.id}`
    })
})

app.get('/search', (req,res)=>{
    if (!req.query.s) {
        res.send({
            status:500,
            error:true,
            message: 'You have to provide a search'
        })
    } else res.send({
            status:200,
            message: 'ok',
            data: req.query.s
    })
})

app.get('/movies/create', (req,res)=>{
    res.send('create')
})

app.get('/movies/read', (req,res)=>{
    res.send({
        status:200,
        data: movies,
    })
})

app.get('/movies/read/by-date', (req,res)=>{
    res.send({
        status:200,
        data: movies.sort((a,b)=>{
            return b.year - a.year
        })
    })
})

app.get('/movies/read/by-rating', (req,res)=>{
    res.send({
        status:200,
        data: movies.sort((a,b)=>{
            return b.rating - a.rating
        })
    })
})

app.get('/movies/read/by-title', (req,res)=>{
    res.send({
        status:200,
        data: movies.sort((a, b) =>{
            var nameA = a.title.toUpperCase();
            var nameB = b.title.toUpperCase();
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          })
    })
    
})

app.get('/movies/update', (req,res)=>{
    res.send('update')
})

app.get('/movies/delete', (req,res)=>{
    res.send('delete')
})

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
  }) 