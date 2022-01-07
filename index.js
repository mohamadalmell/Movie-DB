const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const url = 'mongodb+srv://mohamadalmell:mohamad1234@cluster0.agg9f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

app.use(express.json())


mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error: '))
db.once('open', ()=>{
    console.log('Connection succeeded');
})

const moviesSchema = new mongoose.Schema({
    title : {type: String, required: true},
    year : {type: Number, required: true},
    rating : {type: Number, required: true, default: 4.0},
}, {versionKey: false});

const movies = mongoose.model("movies", moviesSchema);

movies.create(
    {title: 'Jaws', year: 1975, rating: 8},
    {title: 'Avatar', year: 2009, rating: 7.8},
    {title: 'Brazil', year: 1985, rating: 8},
    {title: 'الإرهاب والكباب', year: 1992, rating: 6.2},
    )
.then()
.catch(err => console.log(err))

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
    
    if (yr.length >= 4) {
        movies.create({
            title: ttle,
            year: yr,
            rating: rtg
        }).then(()=>{
            movies.find()
            .then(item =>{
                res.send({status: 200, data: item})
            })
            .catch(err =>{
                console.log(err);
            })
        })
        .catch(err =>{
            console.log(err);
        })
    } else res.status(403).send({message: 'You cannot create a movie wihtou providing a valid year and a title'})
})

app.get('/movies', (req,res) =>{
    let dte = req.query.bydate
    let rtg = req.query.byrating
    let ttle = req.query.bytitle

    if (dte !== undefined) {
        movies.find()
        .then(items =>{
            res.send({
                status:200,
                data: items.sort((a,b)=>{
                    return b.year - a.year
                })
            })
        })
        .catch(err =>{
            res.status(422).send(err);
        })
    }

    if (rtg !== undefined) {
        movies.find()
        .then(items =>{
            res.send({
                status:200,
                data: items.sort((a,b)=>{
                    return b.rating - a.rating
                })
            })
        })
        .catch(err =>{
            res.status(422).send(err);
        })
    }

    if (ttle !== undefined) {
        movies.find()
        .then(items =>{
            res.send({
                status:200,
                data: items.sort((a, b) =>{
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
        .catch(err =>{
            res.status(422).send(err);
        })
    }

    movies.find()
    .then(items =>{
        res.send({
            status: 200,
            data: items
        })
    })
    .catch(err=>{
        console.log('Nothing found');
    })
})

app.get('/movies/:id', (req,res)=>{
    movies.findById(req.params.id)
    .then(items =>{
        res.send({
            status: 200,
            data: items
        })
    })
    .catch(err=>{
        res.send({
            status:404,
            error:true,
            message:`the movie ${req.params.id} does not exist`
        })
    })
})

app.put('/movies/:id', (req,res) =>{
    movies.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        year: req.body.year,
        rating: req.body.rating
    })
    .then(items =>{
        res.send({
            status: 200,
            data: items
        })
    })
    .catch(err=>{
        res.send({
            status:404,
            error:true,
            message:`the movie ${req.params.id} does not exist`
        })
    })
})

app.delete('/movies/:id', (req,res)=>{
    movies.findByIdAndDelete(req.params.id)
    .then(items=>{
        res.send({
            status: 200,
            data: items
        })
    })
    .catch(err=>{
        res.send({
            status:404,
            error:true,
            message:`the movie ${indx} does not exist` 
        })
    })
})

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
  }) 