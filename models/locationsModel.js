const { Locations, Location_imgs, Towns, Location_postmarks, sequelize } = require('../connection_db');
const { checkTownID } = require('./townsModel');

async function getLocationInfo(locationID) {
    try {
        const locationDatas = await checkLocationID(locationID);
        if (locationDatas === false) {
            throw new Error("please enter the correct location id");
        }
        const locationInfo = await Locations.findAll({
            where: {
                id: locationID
            },
            include: [Location_postmarks]
        })
            .then((locationInfo) => {
                let obj = {};
                obj['status_code'] = 200;
                locationInfo.push(obj)
                return locationInfo;
            })
            .catch((err) => {
                let obj = new Error("ORM error");
                obj.status_code = 500;
                obj.err = err;
                throw obj;
            })
        return locationInfo;
    } catch (err) {
        throw err;
    }
}
async function checkLocationID(locationID) {
    try {
        const locationDatas = await Locations.findOne({
            where: {
                id: locationID
            }
        })
            .then((locationDatas) => {
                if (!locationDatas) {
                    return false;
                } else {
                    return locationDatas;
                }
            })
            .catch((err) => {
                let obj = new Error("ORM error");
                obj.status_code = 500;
                obj.err = err;
                throw obj;
            })
        return locationDatas;
    } catch (err) {
        throw err;
    }
}
async function getLocations(townID) {
    Towns.hasMany(Locations, {foreignKey: "town_id"})
    Locations.hasMany(Location_postmarks)
    try {
        const townDatas = await checkTownID(townID);
        if (townDatas === false) {
            throw new Error("please enter the correct town id");
        }
        const locations = await Towns.findAll({
            where: {
                id: townID
            },
            attributes: ['id', 'name'],
            include: [
                {
                    model: Locations,
                    attributes: ['id', 'name'],
                    include: [
                        {
                            model: Location_postmarks,
                            on: {
                                id: sequelize.where(sequelize.col("Locations.location_postmark_id"),
                                    "=", sequelize.col("locations.location_postmarks.id"))
                            },
                            attributes: ['id', 'postmark_img'],
                            require: false
                        }
                    ]
                }
            ]
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
                obj.err = err.message;
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
    getLocations, getLocationInfo, checkLocationID
}