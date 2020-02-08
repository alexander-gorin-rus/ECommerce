const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: true
    });
    console.log('mongo DB connection is OK');
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = connectDB;
