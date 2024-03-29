const { Location_postmarks, Locations, sequelize } = require("../connection_db");
const { onTime } = require('./onTimeModel');

async function destroyLocationPostmark(locationPostmarkID) {
    try {
        const isDelete = await Location_postmarks.destroy({
            where: {
                id: locationPostmarkID
            }
        })
            .then((isDelete) => {
                return [
                    {
                        message: "one location postmark has been deleted",
                        location_postmark_id: locationPostmarkID
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
async function modifyLocationPostmark(payload) {
    try {
        const isUpdate = await Location_postmarks.update(
            {
                description: payload.description,
                postmark_img: payload.imgPath,
                start_date: payload.startDate,
                end_date: payload.endDate,
                remark: payload.remark,
                author: payload.author,
                location_id: payload.locationID
            },
            {
                where: {
                    id: payload.locationPostmarkID
                }
            }
        )
            .then(([isUpdate]) => {
                return [
                    {
                        message: "something changed",
                        datas: {
                            description: payload.description,
                            postmarkImg: payload.imgPath,
                            startDate: payload.startDate,
                            endDate: payload.endDate,
                            remark: payload.remark,
                            author: payload.author,
                            locationID: payload.locationID
                        }
                    },
                    {
                        status_code: 201
                    }
                ]
            })
            .catch((err) => {
                let obj = new Error("ORM modifyLocationPostmark error");
                obj.status_code = 500;
                obj.err = err.message;
                throw obj;
            })
        return isUpdate;
    } catch (err) {
        throw err;
    }
}
async function careateLocationPostmark(payload) {
    try {
        const locationPostmark = await Location_postmarks.create({
            descrioption: payload.descrioption,
            postmark_img: payload.imgPath,
            start_date: payload.startDate,
            end_date: payload.endDate,
            remark: payload.remark,
            author: payload.author,
            location_id: payload.locationID,
            create_time: onTime(),
            update_time: onTime()
        })
            .then((locationPostmark) => {
                return [
                    {
                        message: "admin create a location postmark",
                        datas: locationPostmark
                    },
                    {
                        status_code: 201
                    }
                ];
            })
            .catch((err) => {
                let obj = new Error("ORM careateLocationPostmark error");
                obj.status_code = 500;
                obj.err = err.message;
                throw obj;
            })
        return locationPostmark;
    } catch (err) {
        throw err;
    }
}
async function checkLocationPostmarkID(LocationPostmarkID) {
    try {
        const hasLocationPostmarkID = await Location_postmarks.findOne({
            where: {
                id: LocationPostmarkID
            },
            attributes: ['id']
        })
            .then((hasLocationPostmarkID) => {
                if (!hasLocationPostmarkID) {
                    return false;
                } else {
                    return hasLocationPostmarkID.dataValues.id;
                }
            })
            .catch((err) => {
                let obj = new Error("ORM checkLocationPostmarkID error");
                obj.status_code = 500;
                obj.err = err.message;
                throw obj;
            })
        return hasLocationPostmarkID;
    } catch (err) {
        throw err;
    }
}
async function getLocationPostmarkList(locationID) {
    Locations.hasMany(Location_postmarks, { foreignKey: 'location_id' })
    try {
        const locationPostmarks = await Locations.findAll({
            where: {
                id: locationID
            },
            attributes: ['id'],
            include: [
                {
                    model: Location_postmarks,
                    attributes: ['id', 'postmark_img']
                }
            ]
        })
            .catch((err) => {
                let obj = new Error("ORM error");
                obj.status_code = 500;
                obj.err = err.message;
                throw obj;
            })
        return locationPostmarks;
    } catch (err) {
        throw err;
    }
}
async function getLocationPostmarkIntroduce(postmarkID) {
    try {
        const postmarkDatas = await Location_postmarks.findAll({
            where: {
                id: postmarkID
            },
            attributes: ['id', 'description', 'postmark_img', 'start_date', 'end_date', 'remark', 'author']
        })
            .then(([postmarkDatas]) => {
                return [
                    {
                        message: "get location postmark introduce",
                        datas: postmarkDatas
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
        return postmarkDatas;
    } catch (err) {
        throw err;
    }
}
async function getLocationIntroduce(locationID) {
    Locations.hasMany(Location_postmarks)
    try {
        const locationIntroduce = await Locations.findAll({
            where: {
                id: locationID
            },
            attributes: ['id', 'name', 'address'],
            include: [
                {
                    model: Location_postmarks,
                    on: {
                        id: sequelize.where(sequelize.col("Locations.location_postmark_id"),
                            "=", sequelize.col("location_postmarks.id"))
                    },
                    attributes: ['id', 'postmark_img'],
                    require: false
                },
            ]
        })
            .then(([locationIntroduce]) => {
                return [
                    {
                        message: "get one location",
                        datas: locationIntroduce
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
        return locationIntroduce;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getLocationIntroduce, getLocationPostmarkIntroduce, getLocationPostmarkList, checkLocationPostmarkID,
    careateLocationPostmark, modifyLocationPostmark, destroyLocationPostmark
}