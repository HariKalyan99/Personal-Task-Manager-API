'use strict';
const bcrypt = require('bcrypt');
const { default: config } = require('../config/config');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    let password = config.ADMIN_PASSWORD;
    const hashedPassowrd = bcrypt.hashSync(password, 10)
    return queryInterface.bulkInsert('user', [
      {
        username: 'admin',
        email: config.ADMIN_EMAIL,
        password: hashedPassowrd,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, _) => {
    return queryInterface.bulkDelete('user', null, {});
  },
};