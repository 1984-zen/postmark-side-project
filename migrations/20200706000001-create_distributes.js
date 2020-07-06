'use strict';
const { INTEGER, STRING } = require('sequelize');

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('distributes', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: STRING,
        update_time: STRING,
        create_time: STRING
        });
  },
  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('distributes');
  }
};
