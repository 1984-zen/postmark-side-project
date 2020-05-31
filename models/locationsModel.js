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
async function locationsModelCreate(location) {
    let result = {};
    result.message = `create location successfully`;
    result.result = location;
    await Locations.create({
        name: location.name,
        address: location.address,
        city_id: location.city_id,
        create_time: location.create_time,
        update_time: location.update_time
    })
    return result;
}
async function locationsModelDelete(locationID) {
    let result = {};
    result.message = `delete location successfully`;
    result.delete_id = locationID;
    await Locations.destroy({
        where: { id: locationID }
    })
    return result;
}

module.exports = {
    stampList, locationsModelCreate, locationsModelDelete
}