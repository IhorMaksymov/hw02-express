const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const { DB_HOST, PORT = 3000 } = process.env;

const app = require('./app');

mongoose.connect(DB_HOST)
  .then(() => app.listen(PORT, () => console.log('Database connection successful')))
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });