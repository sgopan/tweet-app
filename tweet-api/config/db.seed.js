const db = require("./db");
const Tweet = require("../models/tweet");

const seed = async () => {
  try {
    await db.sync({ force: true });

    const tweet_id = 123;
    const tweet_message = "hello";
    //const created_at = new Date();
    const user_id = `sgp`;
    const user_name = 'kumar'

    for (i = 0; i < 10; i++) {
      try {
        Tweet.create({
          tweet_id: i,
          tweet_message: tweet_message,
          user_id: user_id,
          user_name: user_name,
          tweeted_at: new Date()
        })
      }
      catch (e) {
        console.log("error while creating tweets", e);
      }
    };
  }
  catch (e) {
    console.log("error while creating table", e);
  }
 

}

module.exports = seed;

