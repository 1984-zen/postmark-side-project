const {INTEGER, STRING} = require('sequelize')

module.exports = sequelize => {
    return sequelize.define('users', {
        id: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true
        },account: {
          type: STRING,
        },
        password: STRING,
        api_token: STRING,
        update_time: STRING,
        create_time: STRING
    }, {timestamps: false})
}