const mongoose = require('mongoose');

const partnersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  info: {
    type: String
  },
  address: {
    type: String,
    trim: true
  },
  phone: {
    type: String
  },
  photo: {
    type: Buffer,
    contentType: String
  }
});

module.exports = mongoose.model('partner', partnersSchema);
