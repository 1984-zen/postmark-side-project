const { INTEGER, STRING } = require('sequelize')

module.exports = sequelize => {
    return sequelize.define('post_imgs', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        img_url: STRING,
        postId: INTEGER,
        update_time: STRING,
        create_time: STRING
    }, { timestamps: false })
}