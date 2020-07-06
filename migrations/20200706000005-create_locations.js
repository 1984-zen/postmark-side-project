'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('locations', {
      id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      name: STRING,
      address: STRING,
      city_id: {
        type: INTEGER,
        references: {
            model: 'cities',
            key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
    },
      town_id: {
        type: INTEGER,
        references: {
            model: 'towns',
            key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
    },
      location_postmark_id: INTEGER,
      update_time: STRING,
      create_time: STRING
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('locations');
  }
};
