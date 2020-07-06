'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_postmarks', {
      id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      postmark_img: STRING,
      imprint_date: STRING,
      post_id: {
        type: INTEGER,
        references: {
            model: 'posts',
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
    return queryInterface.dropTable('user_postmarks');
  }
};
