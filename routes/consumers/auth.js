const express = require('express');
const router = express.Router();
const auth = require('../../middleware/consumerAuth');

const Consumer = require('../../models/Consumers');

router.get('/', auth, async (req, res) => {
  try {
    const consumer = await Consumer.findById(req.consumer.id).select(
      '-password'
    );
    res.json(consumer);
  } catch (err) {
    console.error(err.message);
    res.status(404).json({ msg: 'Такой Клиент не найден' });
  }
});

module.exports = router;
