const { INTEGER, STRING } = require('sequelize')

module.exports = sequelize => {
    return sequelize.define('post_imgs', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        img_url: STRING,
        post_id: INTEGER,
        update_time: STRING,
        create_time: STRING
    }, { timestamps: false })
}