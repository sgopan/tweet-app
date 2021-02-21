const Sequelize = require("sequelize");

const db = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DB_STORAGE_PATH+"twitter.sqlite3"
});

module.exports=db;