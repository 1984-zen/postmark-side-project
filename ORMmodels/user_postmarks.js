const { INTEGER, STRING } = require('sequelize');

module.exports = sequelize => {
    return sequelize.define('user_postmarks', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        postmark_img: STRING,
        imprint_date: STRING,
        post_id: {
            type: INTEGER,
            underscored: true
        },
        create_time: STRING,
        update_time: STRING
    }, { timestamps: false })
}