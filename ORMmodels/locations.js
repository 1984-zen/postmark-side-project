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
        location_imgId: INTEGER,
        update_time: STRING,
        create_time: STRING
    }, { timestamps: false })
}