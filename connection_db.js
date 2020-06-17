const Sequelize = require('sequelize');
const config = require('./config/development_config');
const UserModel = require('./ORMmodels/users');
const StampModel = require('./ORMmodels/stamps');
const PostModel = require('./ORMmodels/posts');
const PostImgModel = require('./ORMmodels/post_imgs');
const CitiesModel = require('./ORMmodels/cities');
const LocationImgModel = require('./ORMmodels/location_imgs');
const LocationsModel = require('./ORMmodels/locations');
const LocationPostmarksModel = require('./ORMmodels/location_postmarks');
const UserPostmarkModel = require('./ORMmodels/user_postmarks');
const DistributesModel = require('./ORMmodels/distributes');
const TownsModel = require('./ORMmodels/towns');
const CollectionsModel = require('./ORMmodels/collections');

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
const Locations = LocationsModel(sequelize);
const Location_imgs = LocationImgModel(sequelize);
const Location_postmarks = LocationPostmarksModel(sequelize);
const User_postmarks = UserPostmarkModel(sequelize);
const Distributes = DistributesModel(sequelize);
const Towns = TownsModel(sequelize);
const Collections = CollectionsModel(sequelize);

Locations.hasMany(Location_imgs)
Location_imgs.belongsTo(Locations)
Locations.hasMany(Location_postmarks)
Collections.belongsTo(Posts)
Cities.hasMany(Towns)
Towns.hasMany(Locations)
Cities.hasMany(Collections)

module.exports = {
  Users, Stamps, Posts, Post_imgs, Cities, Locations, Location_imgs, sequelize, Location_postmarks, User_postmarks,
  Distributes, Towns, Collections
}
