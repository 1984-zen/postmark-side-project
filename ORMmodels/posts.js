const { INTEGER, STRING } = require('sequelize')

module.exports = sequelize => {
  return sequelize.define('posts', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: STRING,
    locationId: {
      type: INTEGER
    },
    user_id: INTEGER,
    update_time: STRING,
    create_time: STRING
  }, { timestamps: false })
}