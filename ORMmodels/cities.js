const { INTEGER, STRING } = require('sequelize')

module.exports = sequelize => {
    return sequelize.define('cities', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: STRING,
        distribute_id: {
            type: STRING,
            underscored: true
        },
        city_img: STRING,
        update_time: STRING,
        create_time: STRING
    }, { timestamps: false })
}