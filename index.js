const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

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

app.post('/movies', (req,res)=>{
    let ttle = req.body.title;
    let yr = req.body.year;
    let rtg = req.body.rating;

    if (!ttle || !yr || isNaN(yr) || yr.length <4) {
        res.send({
            status: 403,
            error: true,
            message: 'You cannot create a movie without providing a title and a year',
        })
    }else {
        if (!rtg) {
            rtg = 4.0;
        }
        movies.push({title: ttle, year: yr, rating: rtg,})
        res.send({
            status: 200,
            data: movies,
        })
    }    
})

app.get('/movies', (req,res) =>{
    let dte = req.query.bydate
    let rtg = req.query.byrating
    let ttle = req.query.bytitle

    if (dte !== undefined) {
        res.send({
            status:200,
            data: movies.sort((a,b)=>{
                return b.year - a.year
            })
        })
    }

    if (rtg !== undefined) {
        res.send({
            status:200,
            data: movies.sort((a,b)=>{
                return b.rating - a.rating
            })
        })
    }

    if (ttle !== undefined) {
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
    }

    res.send({
        status: 200,
        data: movies
    })
})

app.get('/movies/:id', (req,res)=>{
    let indx = parseInt(req.params.id);
    const movie = movies.find( i => movies.indexOf(i) === indx)
    if (!movie) {
        res.send({
            status:404,
            error:true,
            message:`the movie ${indx} does not exist`
        })} else{
            res.send({
            status:200,
            data: movies[indx]
        })
    }
})

app.put('/movies/:id', (req,res) =>{
    let indx = parseInt(req.params.id);
    const movie = movies.find( i => movies.indexOf(i) === indx)

    if (!movie) {
        res.send({
            status:404,
            error:true,
            message:`the movie ${indx} does not exist`
        })
    } else {
        if (newTitle !== undefined) {
            movie.title = req.body.title 
        } 
        if (newYear !== undefined) {
            movie.year = req.body.year
        }
        if (newRating !== undefined) {
            movie.rating = req.body.rating
        }

        res.send({
            status:200,
            data: movies,
        })
    }
})

app.delete('/movies/:id', (req,res)=>{
    let indx = parseInt(req.params.id);
    const movie = movies.find( i => movies.indexOf(i) === indx)

    if (!movie) {
        res.send({
            status:404,
            error:true,
            message:`the movie ${indx} does not exist`
        })
    } else {
        movies.splice(indx, 1)
        res.send({
            status:200,
            data: movies,
        })
    }
})

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
  }) 