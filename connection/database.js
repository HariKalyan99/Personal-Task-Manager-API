const { Sequelize } = require("sequelize");
const config = require("../config/config");

const env = config.NODE_ENV || "development";
const sequelize = new Sequelize(config[env]);

module.exports = sequelize;
