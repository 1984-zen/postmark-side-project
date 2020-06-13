const { INTEGER, STRING } = require('sequelize')

module.exports = sequelize => {
    return sequelize.define('collections', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        post_id: INTEGER,
        user_id: INTEGER,
        city_id: INTEGER,
        location_id: INTEGER,
        update_time: STRING,
        create_time: STRING
    }, { timestamps: false })
}