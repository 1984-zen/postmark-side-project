'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('towns', {
      id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      name: STRING,
      city_id: {
        type: INTEGER,
        references: {
            model: 'cities',
            key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
    },
      update_time: STRING,
      create_time: STRING
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('towns');
  }
};
