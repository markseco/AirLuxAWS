const mongoose = require('mongoose');

const Plane = new mongoose.Schema({
    name: String,
    description: String,
    capacity: Number,
    speed: Number,
    range: Number,
    images: [String],
    extraInfo: String,
    price: Number,
    airport: String,
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});

module.exports = mongoose.model('Plane', Plane);

