'use strict';
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    let password = process.env.ADMIN_PASSWORD;
    const hashedPassowrd = bcrypt.hashSync(password, 10)
    return queryInterface.bulkInsert('user', [
      {
        username: 'admin',
        email: process.env.ADMIN_EMAIL,
        password: hashedPassowrd,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', null, {});
  },
};