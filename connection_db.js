const Sequelize = require('sequelize')
const config = require('./config/development_config')
const TestModel = require('./models/test')
const sequelize = new Sequelize({database: config.mysql.database, username: config.mysql.user, password: config.mysql.password,
    host: config.mysql.host,
    dialect: 'mysql',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });

const Test = TestModel(sequelize, Sequelize);

module.exports = {
    Test
}
