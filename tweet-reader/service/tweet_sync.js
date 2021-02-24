const tweets_writer = require('../helpers/twitter/tweet_writer');
const tweet_reader = require('../helpers/twitter/tweet_reader');

const sync_tweets = async () => {
    try {
        const tweets = await tweet_reader.search_tweets();
        console.log("Total tweets read",tweets.length);
        await  tweets_writer.write_tweets(tweets);
    }
    catch(e) {
        console.log("Error while syncing tweets", e)
    }
   
}

module.exports.sync_tweets = sync_tweets;