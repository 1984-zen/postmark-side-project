'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('location_postmarks', {
      id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      description: STRING,
      postmark_img: STRING,
      start_date: STRING,
      end_date: STRING,
      remark: STRING,
      author: STRING,
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
    return queryInterface.dropTable('location_postmarks');
  }
};
