const mongoose = require('mongoose');

const frontPageSchema = new mongoose.Schema({
  photo: {
    type: Buffer,
    contentType: String
  }
});

module.exports = mongoose.model('frontPage', frontPageSchema);
