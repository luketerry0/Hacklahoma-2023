import express from 'express';
var cors = require('cors')

const app = express();

// Disable CORS, allowing any website to access the api
app.use(cors())

app.listen(3000, () =>
  console.log('API listening on port 3000'),
);

// serve the directory of static images for the frontend to use
app.use(express.static('assets'));
