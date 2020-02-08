const mongoose = require('mongoose');

const HouseHoldSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  volume: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('houseHoldChemicals', HouseHoldSchema);
