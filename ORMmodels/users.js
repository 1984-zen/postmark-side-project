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
        isAdmin: INTEGER,
        password: STRING,
        api_token: STRING,
        name: STRING,
        intro: STRING,
        head: STRING,
        update_time: STRING,
        create_time: STRING
    }, {timestamps: false})
}