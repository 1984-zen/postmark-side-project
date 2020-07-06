'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('posts', {
      id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      content: STRING,
      user_id: {
        type: INTEGER,
        references: {
            model: 'users',
            key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
    },
      city_id: {
        type: INTEGER,
        references: {
            model: 'cities',
            key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
    },
      location_id: {
        type: INTEGER,
        references: {
            model: 'locations',
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
    return queryInterface.dropTable('posts');
  }
};
