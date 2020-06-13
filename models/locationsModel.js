const { Locations, Location_imgs, Towns, sequelize } = require('../connection_db');

async function getLocations() {
    try {
        const locations = await Towns.findAll({
            include: [Locations]
        })
            .then((locations) => {
                let obj = {};
                obj['status_code'] = 200;
                locations.push(obj)
                return locations;
            })
            .catch((err) => {
                let obj = new Error("ORM error");
                obj.status_code = 500;
                obj.err = err;
                throw obj;
            })
        return locations;
    } catch (err) {
        throw err;
    }
}
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
async function isLocationStampImg(stampResult) {
    console.log(stampResult.result.location_id
    )
    await Locations.update(
        {
            location_imgId: stampResult.location_img_id
        },
        {
            where:
            {
                id: stampResult.result.location_id
            }
        }
    )
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
async function locationsModelPut(location) {
    let result = {};
    result.message = `modify location successfully`;
    result.result = location;
    await Locations.update(
        {
            location_id: location.location_id,
            name: location.locationName,
            address: location.address,
            city_id: location.city_id
        },
        { where: { id: location.location_id } }
    )
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
    stampList, locationsModelCreate, locationsModelDelete, locationsModelPut, isLocationStampImg,
    getLocations
}