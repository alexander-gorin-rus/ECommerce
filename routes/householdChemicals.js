const express = require('express');
const router = express.Router();

const HouseHoldChemicals = require('../models/HouseHoldChemicals');

router.get('/', (req, res) => {
  res.send('House Hold Chemicals folder is working');
});
