const { INTEGER, STRING } = require('sequelize');

module.exports = sequelize => {
  return sequelize.define('posts', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: STRING,
    location_id: {
      type: INTEGER,
      underscored: true
    },
    user_id: INTEGER,
    city_id: {
      type: INTEGER,
      underscored: true
    },
    update_time: STRING,
    create_time: STRING
  }, { timestamps: false })
}