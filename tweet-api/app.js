const dotenv = require('dotenv').config();
const express = require('express');
const router = express.Router();
const db = require('./config/db');


// Connect to  database
db.authenticate()
  .then((result) => {
    console.log("Connection established to sqllite.");
  })
  .catch((error) => {
    console.log("Error while connecting to database to connect to db: ", error);
    throw e;
  });

// start app
const app = express();

module.exports = app;

