const mongoose = require('mongoose')
const parkSchema = new mongoose.Schema(
    {
        name: String,
        address: String,
        latitude: Number,
        longitude: Number,
        image: {type: String, default: 'https://i.pinimg.com/originals/27/3f/71/273f71992c2660ba57a2823db7389a8f.jpg'}
    }
)

const Park = mongoose.model('Park', parkSchema)
module.exports = Park
