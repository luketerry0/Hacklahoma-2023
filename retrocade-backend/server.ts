import express from 'express';
var cors = require('cors')
import controllerSocket from './controllerSocket';
require('dotenv').config()

const app = express();

// Disable CORS, allowing any website to access the api
app.use(cors())

var expressWs = require('express-ws')(app);

// serve the directory of static images for the frontend to use
app.use(express.static('assets'));

controllerSocket(app);

const address = process.env.IPV4_ADDRESS === undefined ? "localhost" : process.env.IPV4_ADDRESS;

app.listen(3000, address , () =>
  console.log('API listening on port 3000'),
);


