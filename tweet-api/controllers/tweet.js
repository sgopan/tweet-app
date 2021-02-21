const Tweet = require('../models/tweet');

const error_message = {
    error: "There was an error querying tweets"
};

const tweets_controller = {
    all  (req, res) {
        return Tweet.findAll()
            .then((tweets) => res.send(tweets))
            .catch((err) => {
                console.log('There was an error reading tweets', JSON.stringify(err))
                res.status(500);
                return res.send(err);
        });
    }
};

module.exports = tweets_controller;