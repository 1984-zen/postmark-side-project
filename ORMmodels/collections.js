const { INTEGER, STRING } = require('sequelize');

module.exports = sequelize => {
    return sequelize.define('collections', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        postId: INTEGER,
        user_id: INTEGER,
        cityId: INTEGER,
        locationId: INTEGER,
        update_time: STRING,
        create_time: STRING
    }, { timestamps: false })
}