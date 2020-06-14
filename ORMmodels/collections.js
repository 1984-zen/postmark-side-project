const { INTEGER, STRING } = require('sequelize')

module.exports = sequelize => {
    return sequelize.define('collections', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        postId: {
            type: INTEGER,
            // underscored: true
        },
        user_id: INTEGER,
        cityId: INTEGER,
        locationId: {
            type: INTEGER,
        },
        update_time: STRING,
        create_time: STRING
    }, { timestamps: false })
}