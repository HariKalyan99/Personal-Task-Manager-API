const { Sequelize } = require("sequelize");
const config = require("../config/config")[env];
const sequelize = new Sequelize(config);
module.exports = sequelize;
