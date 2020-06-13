const { INTEGER, STRING } = require('sequelize')

module.exports = sequelize => {
    return sequelize.define('location_postmarks', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description: STRING,
        postmark_img: STRING,
        imprint_date: STRING,
        start_date: STRING,
        end_date: STRING,
        remark: STRING,
        locationId: INTEGER,
        update_time: STRING,
        create_time: STRING
    }, { timestamps: false })
}