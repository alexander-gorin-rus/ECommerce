const mongoose = require('mongoose');

const textSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true
    }
  },
  { timestamp: true }
);

module.exports = mongoose.model('Text', textSchema);
