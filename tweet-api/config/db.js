const Sequelize = require("sequelize");

console.log("Database filepath ....",process.env.DB_STORAGE_PATH);

const db = new Sequelize({
  dialect: "sqlite",
  storage: process.env.DB_STORAGE_PATH + "twitter.sqlite3"
});

process.on('SIGINT', async () => {
  try {
    await db.close();
    console.log("Closed the database connections...");
  }
  catch(e) {
    console.log("Exception while closing database connections...");
  }   
});

module.exports = db;