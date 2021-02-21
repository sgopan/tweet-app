const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors')
const logger = require('morgan');
const body_parser = require('body-parser');

const db = require('./config/db');

var hostname = process.env.SERVER_HOST ||'localhost';
const port = process.env.SERVER_PORT || 3000;

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
app.use(cors());
app.use(logger('dev'));
//Use json
app.use(body_parser.json());

const  tweet_router = require('./routes/tweet');
app.use('/', tweet_router);
app.use('/tweets', tweet_router);



app.listen(port, hostname, () =>{
  console.log('Server running at http://'+hostname+':'+port);
});

process.on('SIGINT', () => {
  db.close();
});

module.exports = app;

