const dotenv = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();
const db = require('./config/db');
const tweet_sync = require('./service/tweet_sync');


const hostname = process.env.HOST_NAME || 'localhost';
const port = process.env.SERVER_PORT || 3000;

const app = express();
//Use json
app.use(express.json());
app.use(bodyParser);

// Connect to  database
db.authenticate()
  .then((result) => {
    console.log("Connection established to sqllite.");
    // start app
    app.listen(port, hostname, () => {
      console.log('Server running at http://' + hostname + ':' + port);
    });    

    if(process.env.SYNC_FREQUENCY != '*')  tweet_sync.sync_tweets();
    else {
      console.log("Registering twitter sync timer");
      setInterval(async () => {
        console.log('Starting tweet sync');
        try {
          await tweet_sync.sync_tweets();
          console.log('Completed tweet sync succesfully');
        }
        catch(e) {
          console.error('Exception while syncing tweets', e);        
        }
      }, process.env.SYNC_INTERVAL);
    }
    /* */
  
  })
  .catch((error) => {
    console.log("Error while connecting to database to connect to db: ", error);
    throw e;
  });


module.exports = app;


