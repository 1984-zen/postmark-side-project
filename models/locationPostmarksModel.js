const { Location_postmarks, Locations, sequelize } = require("../connection_db");

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
            .then((postmarkDatas) => {
                if (!postmarkDatas) {
                    return false;
                } else {
                    let obj = {};
                    obj['status_code'] = 200;
                    postmarkDatas.push(obj)
                    return postmarkDatas;
                }
            })
            .catch((err) => {
                let obj = new Error("ORM error");
                obj.status_code = 500;
                obj.err = err.message;
                throw obj;
            })
        return postmarkDatas;
    } catch (err) {

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
async function createPostmarkToDB(payload) {
    const result = await Location_postmarks.create(
        {
            location_id: payload.locationID,
            start_date: payload.startDate,
            end_date: payload.endDate,
            postmark_img: payload.postmarkImg,
            description: payload.description,
            remark: payload.remark,
            postmark_img: payload.imgPath
        }
    );
    if (!result) {
        return false;
    } else {
        return result;
    }
}
async function checkUploadLocationPostmark(payload) {
    try {
        const locationDatas = await checkLocationID(locationID = payload.locationID);
        if (locationDatas === false) {
            throw new Error("please enter the correct location id");
        }
        createResult = await createPostmarkToDB(payload)
        if (createResult === false) {
            throw new Error("create postmark to db failed");
        }
        return createResult;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    checkUploadLocationPostmark, getLocationIntroduce, getLocationPostmarkIntroduce, getLocationPostmarkList, checkLocationPostmarkID
}