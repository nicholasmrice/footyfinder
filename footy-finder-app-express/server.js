const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI

app.use(express.json())
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const parksController = require('./controllers/parks_controller.js')
app.use('/parks/', parksController)

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

mongoose.connection.on('error', (err) =>
  console.log(err.message, ' is mongodb not running/Problem w Atlas connection?'))

mongoose.connection.on('connected', () =>
  console.log('mongo connected: ', MONGODB_URI))

mongoose.connection.on('disconnected', () =>
console.log('mongo disconnected'))

app.listen(PORT, () => {
  console.log(`listening on port, ${PORT}`);
})
