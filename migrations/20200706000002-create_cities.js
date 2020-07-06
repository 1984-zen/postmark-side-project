'use strict';
const { INTEGER, STRING } = require('sequelize');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('cities', {
            id: {
                type: INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: STRING,
            distribute_id: {
                type: INTEGER,
                references: {
                    model: 'distributes',
                    key: 'id'
                },
                onUpdate: 'cascade',
                onDelete: 'cascade'
            },
            city_img: STRING,
            update_time: STRING,
            create_time: STRING
        }
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('cities');
    }
};
