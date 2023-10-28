const mongoose = require('mongoose');

const Booking = new mongoose.Schema({
    plane: { type: mongoose.Schema.Types.ObjectId, ref: 'Plane', required: true },
    bookingUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    lenderUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    price: { type: Number, required: true },
    email: {type: String, required: true},
});


module.exports = mongoose.model('Booking', Booking);

