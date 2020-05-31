const { Locations, Location_imgs, sequelize } = require('../connection_db')

async function stampList(cityID) {

    return await Locations.findAll({
        where: {
            city_id: cityID
        },
        include: [
            {
                model: Location_imgs,
                on: { id: sequelize.where(sequelize.col("Locations.location_imgId"), "=", sequelize.col("Location_imgs.id")) },
                require: false
            }
        ]
    })
}

module.exports = {
    stampList
}