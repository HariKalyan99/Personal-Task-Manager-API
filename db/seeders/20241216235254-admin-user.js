'use strict';
const bcrypt = require('bcrypt');
const config = require('../../config/config');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, _) => {
    let password = config.ADMIN_PASSWORD;
    let hashedPassword = bcrypt.hashSync(password, 10)
    return queryInterface.bulkInsert('user', [
      {
        username: 'Admin',
        email: config.ADMIN_EMAIL,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, _) => {
    return queryInterface.bulkDelete('user', null, {});
  },
};
