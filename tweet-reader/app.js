const dotenv = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();
const db = require('./config/db');
require("./config/db.seed");

const port = process.env.SERVER_PORT || 3000;

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
//Use json
app.use(express.json());
app.use(bodyParser);
/*app.use('/', indexRouter);
app.use('/twitter', twitterRouter);*/

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});

process.on('SIGINT', () => {
  db.close();
});

module.exports = app;

