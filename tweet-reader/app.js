const dotenv = require('dotenv').config();
const express = require('express');
const router = express.Router();
const db = require('./config/db');


// start database
db.authenticate()
  .then((result) => {
    console.log("Connection established to sqllite.");
  })
  .catch((error) => {
    console.log("Error while connecting to database to connect to db: ", error);
  });

// start app
const app = express();

module.exports = app;

