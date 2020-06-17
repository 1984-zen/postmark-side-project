const { INTEGER, STRING } = require('sequelize')

module.exports = sequelize => {
    return sequelize.define('locations', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: STRING,
        city_id: INTEGER,
        address: STRING,
        location_postmark_id: INTEGER,
        town_id: {
            type: INTEGER,
            underscored: true
        },
        update_time: STRING,
        create_time: STRING
    }, { timestamps: false })
}