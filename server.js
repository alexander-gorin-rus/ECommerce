const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('My API running'));

app.use(express.json({ extended: false }));

//app.use('/house-cleaning', require('./routes/householdChemicals'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
