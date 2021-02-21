const express = require('express');
const router = express.Router();
const tweets_controller = require("../controllers/tweet");


router.get('/', tweets_controller.all);
router.get('/api/tweets', tweets_controller.all); 

module.exports = router;