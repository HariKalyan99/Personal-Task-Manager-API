const { Sequelize } = require("sequelize");
const env = "development";
const config = require("../config/config")[env];
const sequelize = new Sequelize(config);
module.exports = sequelize;
