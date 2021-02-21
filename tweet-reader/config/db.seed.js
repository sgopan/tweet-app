const db = require("./db");
const Tweet = require("../models/tweet");

const seed = async () => {
  await db.sync({ force: true });

  const tweet_id = 123;
  const tweet_message = "hello";
  const created_at = new Date();
  const user_id = `sgp`;
  const user_name ='kumar'

  Tweet.create({
    tweet_id: tweet_id,
    tweet_message: tweet_message,
    created_at: created_at,
    user_id: user_id,
    user_name:user_name
  })
    .then((tweet) => {
      console.log("seeded tweet", tweet);
      Tweet.findOne({ where: { tweet_message: `${tweet.tweet_message}` } })
        .then((tweet) => {
          console.log("found in db after adding");
          db.close();
        })
        .catch((error) => {
          console.error("error looking for new tweet in db: ", error);
          db.close();
        });
    })
    .catch((error) => {
      console.error("failed to seed, ", error);
      db.close();
    });
};

seed();