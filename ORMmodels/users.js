module.exports = (sequelize, type) => {
    return sequelize.define('users', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },account: {
          type: type.STRING,
        },
        password: type.STRING,
        update_time: type.STRING,
        create_time: type.STRING
    }, {timestamps: false})
}