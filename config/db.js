const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
//const db = config.get('mongoCompass');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log('mongo DB connection for Max shop is OK');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
