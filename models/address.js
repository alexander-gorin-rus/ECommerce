const mongoose = require('mongoose');
//const ObjectId = mongoose.Schema;
const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
    trim: true
  },
  building: {
    type: String,
    required: true,
    trim: true
  },
  appartment: {
    type: String,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = mongoose.model('Address', addressSchema);
