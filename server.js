const path = require('path');
const express = require('express');
const MongoDB = require('./config/db');
const dotenv = require('dotenv');
const morgan = require('morgan');
const errorHandler = require('./middleware/error');
const cookieParser = require('cookie-parser');
require('dotenv').config();

dotenv.config({ path: './config/config.env' });

const app = express();

//Mongo DB connection
MongoDB();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//middlewares
//app.use(morgan('dev'));
app.use(express.json({ extended: false }));
app.use(cookieParser());

//routes
app.use('/api', require('./routes/admin/admin'));
app.use('/api', require('./routes/consumers/consumers'));
app.use('/api', require('./routes/categories/categories'));
app.use('/api', require('./routes/products/product'));
app.use('/api', require('./routes/texts/text1'));
app.use('/api', require('./routes/texts/companyName'));
app.use('/api', require('./routes/partners/partners'));
app.use('/api', require('./routes/frontPage/frontPage'));
app.use('/uploads', express.static('uploads'));

app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
