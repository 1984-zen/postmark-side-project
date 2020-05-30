const Sequelize = require('sequelize')
const config = require('./config/development_config')
const UserModel = require('./ORMmodels/users')
const StampModel = require('./ORMmodels/stamps')
const PostModel = require('./ORMmodels/posts')
const PostImgModel = require('./ORMmodels/post_imgs')
const CitiesModel = require('./ORMmodels/cities')

const sequelize = new Sequelize({
  database: config.mysql.database, username: config.mysql.user, password: config.mysql.password,
  host: config.mysql.host,
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const Users = UserModel(sequelize);
const Stamps = StampModel(sequelize);
const Posts = PostModel(sequelize);
const Post_imgs = PostImgModel(sequelize);
const Cities = CitiesModel(sequelize);

module.exports = {
  Users, Stamps, Posts, Post_imgs, Cities
}
