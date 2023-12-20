const mongoose = require('mongoose');
const User = require('./User'); 

const placeSchema = mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  address: String,
  photos: [String],
  uploadphotos: [String],
  description: String,
  features: [String],
  extrainfo: String,
  checkin: Number,
  checkout: Number,
  maxguest: Number,
  price:Number,
}, { collection: 'newDatas' });

const placeModel = mongoose.model('place', placeSchema);
module.exports = placeModel;
