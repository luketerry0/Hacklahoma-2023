import express from 'express';
var cors = require('cors')
import controllerSocket from './controllerSocket';

const app = express();

// Disable CORS, allowing any website to access the api
app.use(cors())

var expressWs = require('express-ws')(app);

// serve the directory of static images for the frontend to use
app.use(express.static('assets'));

controllerSocket(app);

app.listen(3000, "10.204.249.206", () =>
  console.log('API listening on port 3000'),
);


