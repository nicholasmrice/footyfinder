const express = require('express')
const parks = express.Router()

const Park = require('../models/parks.js')

parks.get('/', (req, res) => {
    Park.find({}, (err, foundParks) => {
        res.json(foundParks)
    })
})

//to hit this route must type localhost:3000/parks/setup/seed in browser
parks.get('/setup/seed', (req, res) => {
    Park.create(
        [
           {
              name: 'Flushing Meadows Corona Park',
              address: "47-01 111th Street, Corona, NY 11368",
              latitude: '',
              longitude: '',
              image: 'https://www.nycgo.com/images/venues/1169/flushingmeadowcorona_schaer-004__x_large.jpg'
           }
        ],
        (err, createdPark) => {
            Park.find({}, (err, foundParks) => {
                res.redirect('/parks')
            })

        }
    )
})

parks.post('/', (req, res) => {
    Park.create(req.body, (err, createdPark) => {
        Park.find({}, (err, foundParks) => {
            res.json(foundParks)
        })
    })
})

parks.put('/:id', (req, res) => {
    Park.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedPark) => {
        if(err) {
            res.send(err)
        }else{
            Park.find({}, (err, foundParks) => {
                res.json(foundParks)
            })
        }
    })
})

parks.delete('/:id', (req, res) => {
    Park.findByIdAndRemove(req.params.id, (err, deletedPark) => {
        Park.find({}, (err, foundParks) => {
            res.json(foundParks)
        })
    })
})

module.exports = parks
