const mongoose = require('mongoose');


const { DATABASE } = process.env;
const dbUrl = DATABASE;

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connection successful');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });
