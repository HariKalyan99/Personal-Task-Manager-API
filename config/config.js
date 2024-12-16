const dotenv = require("dotenv");
dotenv.config({ path: `${process.cwd()}/.env` });

const config = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT || "postgres",
    seederStorage: "sequelize",
  },
  PORT: process.env.APP_PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  NODE_ENV: process.env.NODE_ENV,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432, 
    dialect: "postgres",  
    dialectOptions: {
      ssl: {
        require: true,   
        rejectUnauthorized: false, 
      },
    },
    seederStorage: 'sequelize',
  },
};

module.exports = config;