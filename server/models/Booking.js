const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    place: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'place' },
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
    checkin: { type: Date, required: true },
    checkout: { type: Date, required: true },
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    mobilenumber: { type: String, required: true },
    price: { type: Number },
    numberofguest: { type: Number },
}, { collection: 'bookings' });

const bookingModel = mongoose.model('Booking', bookingSchema);

module.exports = bookingModel;
