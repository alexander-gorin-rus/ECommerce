const mongoose = require('mongoose');

const companyNameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('companyName', companyNameSchema);
