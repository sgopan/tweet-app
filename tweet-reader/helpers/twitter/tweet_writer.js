const Tweet = require('../../models/tweet');

const write_tweets = async (tweets) => {
    if( tweets && tweets.length == 0) {
        console.error("No tweets to write. Recieved empty tweet records");
    }
    else {
        //Create the table if doesn't exist and alters it based on Model
        await Tweet.sync({ alter: true });
        tweets.forEach( async tweet => {
            const is_duplicate = await check_for_duplicates(tweet);
            if(is_duplicate) {
                console.log("Duplicate tweet found. Will skip tweet ", tweet)
            }
            else {
                try {
                    const tweet_created = Tweet.create({
                        tweet_id: tweet.tweet_id,
                        tweet_message: tweet.tweet_message,                   
                        user_id: tweet.user_id,
                        user_name: tweet.user_name,
                        tweeted_at: tweet.tweeted_at
                      });
                      if(tweet_created) console.log("Sucessfully created tweet in database", tweet_created);
                      else console.error("Error while writing tweets to databas", tweet_created);
                }
                catch(e) {
                    console.log("Exception while writing tweets to database", e);                
                }               
            }
        })
    }
}

const check_for_duplicates = async (tweet) => {
    try  {
        const duplicate_tweet = await Tweet.findOne({ where: { tweet_id: `${tweet.tweet_id}` } });
        return duplicate_tweet ? true : false;
    }
    catch(e) {
        console.error(e);
        console.error("Error while checking for duplicates for tweet -", e);
        console.error("Error - Will skip writing the tweet to database -");
        return true;
    }    
}

module.exports.write_tweets = write_tweets;

