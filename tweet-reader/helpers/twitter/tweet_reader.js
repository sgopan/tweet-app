const axios = require('axios');

const aux_search_params = '&tweet.fields=created_at,author_id&expansions=author_id';

let twitter_http_connector = axios.create({
    headers: {
        'Authorization': 'Bearer ' + process.env.TWITTER_BEARER_TOKEN,
        'Content-Type': 'application/json'
    }
});

const search_tweets = async (query_string) => {
    let tweets = [];

    try {
        const response = await twitter_http_connector.get(process.env.TWITTER_SEARCH_API_URL +
            "?query=" + encodeURIComponent(process.env.TWITTER_SEARCH_HASHTAG)
            + aux_search_params);
            console.log("response",response);
        const data = response.data;

        if ( data && data.data) {
            data.data.forEach(tweet => {         
                const { id: tweet_id, created_at: tweeted_at, text: tweet_message, author_id: user_id } = tweet;
                let tweet_record = {tweet_id, tweeted_at, tweet_message, user_id};
                if(data.includes && data.includes.users) {
                    const user = data.includes.users.find(user => user.id === tweet.author_id);
                    if(user) tweet_record.user_name = user.username
                }
                tweets.push(tweet_record);
                
            });

           
        }
        else {
            console.log("Couldn't find any tweets for search criteria");
        }
       
    }
    catch (e) {
        console.error("Error while searching tweets", e);        
    }
    return tweets;
}

module.exports.search_tweets = search_tweets;