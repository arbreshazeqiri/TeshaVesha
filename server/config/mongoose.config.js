const mongoose = require('mongoose');
const mongoEndpoint = 'mongodb://localhost/';
const dbName = 'products-db';

mongoose
  .connect(mongoEndpoint + dbName)
  .then(() => console.log(`Connected to the ${dbName} db`))
  .catch((err) => console.log('ERROR IN CONNECTION TO DB', err));