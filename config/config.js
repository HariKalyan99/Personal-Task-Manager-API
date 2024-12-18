const dotenv = require("dotenv");
dotenv.config({ path: `${process.cwd()}/.env` });

const environment = process.env.NODE_ENV || 'development';

const config = {
  [environment]: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    seederStorage: "sequelize",
    dialectOptions: environment === 'production' ? {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    } : {},
  },
  APP_PORT: process.env.APP_PORT,
  NODE_ENV: environment,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
};


module.exports = config