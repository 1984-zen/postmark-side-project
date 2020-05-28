const { INTEGER, STRING } = require('sequelize')

module.exports = sequelize => {
  return sequelize.define('stamps', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    }, name: {
      type: STRING,
    },
    img_url: STRING,
    location_id: STRING,
    user_id: STRING,
    update_time: STRING,
    create_time: STRING
  }, { timestamps: false })
}