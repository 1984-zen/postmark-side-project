'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      account: STRING,
      password: STRING,
      name: STRING,
      api_token: STRING,
      head_img: STRING,
      is_admin: INTEGER,
      update_time: STRING,
      create_time: STRING
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
