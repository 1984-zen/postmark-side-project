const { Locations, Towns, Location_postmarks, sequelize, Posts, User_postmarks } = require('../connection_db');
const { checkTownID } = require('./townsModel');
const { onTime } = require('./onTimeModel');

async function destroyLocation(locationID) {
    try {
        const isDelete = await Locations.destroy({
            where: {
                id: locationID
            }
        })
            .then((isDelete) => {
                return [
                    {
                        message: "one location has been deleted",
                        location_id: locationID
                    },
                    {
                        status_code: 204
                    }
                ]
            })
        return isDelete;
    } catch (err) {
        throw err;
    }
}
async function modifyLocation(payload) {
    try {
        const isUpdate = await Locations.update(
            {
                name: payload.locationName,
                address: payload.locationAddress,
                city_id: payload.cityID,
                town_id: payload.townID,
                location_postmark_id: payload.locationPostmarkID
            },
            {
                where: {
                    id: payload.locationID
                }
            }
        )
            .then(([isUpdate]) => {
                return [
                    {
                        message: "something changed",
                        datas: {
                            locationName: payload.locationName,
                            locationAddress: payload.locationAddress,
                            cityID: payload.cityID,
                            townID: payload.townID,
                            locationPostmarkID: payload.locationPostmarkID
                        }
                    },
                    {
                        status_code: 201
                    }
                ]
            })
            .catch((err) => {
                let obj = new Error("ORM modifyLocation error");
                obj.status_code = 500;
                obj.err = err.message;
                throw obj;
            })
        return isUpdate;
    } catch (err) {
        throw err;
    }
}
async function createLocation(payload) {
    try {
        const location = await Locations.create({
            name: payload.locationName,
            address: payload.locationAddress,
            city_id: payload.cityID,
            town_id: payload.townID,
            location_postmark_id: payload.locationPostmarkID,
            create_time: onTime(),
            update_time: onTime()
        })
            .then((location) => {
                return [
                    {
                        message: "admin create a location",
                        data: location
                    },
                    {
                        status_code: 201
                    }
                ];
            })
            .catch((err) => {
                let obj = new Error("ORM createLocation error");
                obj.status_code = 500;
                obj.err = err;
                throw obj;
            })
        return location;
    } catch (err) {
        throw err;
    }
}
async function getLocationPosts(locationID) {
    try {
        const posts = await Locations.findAll({
            where: {
                id: locationID
            },
            attributes: ['id'],
            include: [
                {
                    model: Posts,
                    attributes: ['id', 'content'],
                    include: [
                        {
                            model: User_postmarks,
                            attributes: ['id', 'postmark_img', 'imprint_date']
                        }
                    ]
                }
            ]
        })
            .then(([posts]) => {
                return [
                    {
                        message: "get some posts",
                        datas: posts
                    },
                    {
                        status_code: 200
                    }
                ]
            })
            .catch((err) => {
                let obj = new Error("ORM error");
                obj.status_code = 500;
                obj.err = err.message;
                throw obj;
            })
        return posts;
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
                let obj = new Error("ORM checkLocationID error");
                obj.status_code = 500;
                obj.err = err.message;
                throw obj;
            })
        return locationDatas;
    } catch (err) {
        throw err;
    }
}
async function getLocations(townID) {
    Towns.hasMany(Locations, { foreignKey: "town_id" })
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
                                id: sequelize.where(sequelize.col("locations.location_postmark_id"),
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

module.exports = {
    getLocations, checkLocationID, getLocationPosts, createLocation, modifyLocation,
    destroyLocation
}