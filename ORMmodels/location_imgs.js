const { INTEGER, STRING } = require('sequelize')

module.exports = sequelize => {
    return sequelize.define('location_imgs', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: STRING,
        locationId: INTEGER,
        img_url: STRING,
        update_time: STRING,
        create_time: STRING
    }, { timestamps: false })
}