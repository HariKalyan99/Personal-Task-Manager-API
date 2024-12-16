const { Sequelize} = require('sequelize');
const config = require('../config/config')[env];

const env = config.NODE_ENV || 'development';
const sequelize = new Sequelize(config);

module.exports =  sequelize;

