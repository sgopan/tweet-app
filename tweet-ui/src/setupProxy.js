const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  require('dotenv').config();
  const tweetApiUrl = process.env.TWEET_API_URL;
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'tweetApiUrl',
      changeOrigin: true,
    })
  );
};