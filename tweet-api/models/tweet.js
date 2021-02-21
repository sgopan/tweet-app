const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Tweet = sequelize.define("Tweet", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tweet_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  tweet_message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  user_name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Tweet;