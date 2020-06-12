const { INTEGER, STRING } = require('sequelize')

module.exports = sequelize => {
    return sequelize.define('distributes', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: STRING,
        update_time: STRING,
        create_time: STRING
    }, { timestamps: false })
}