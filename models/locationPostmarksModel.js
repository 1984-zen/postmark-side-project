const { Location_postmarks, Locations, sequelize } = require("../connection_db");
const { checkLocationID } = require('./locationsModel');

async function getPostmarkInfo(postmarkID) {
    try {
        const postmarkInfo = await Location_postmarks.findAll({
            where: {
                id: postmarkID
            }
        })
            .then((postmarkInfo) => {
                if (!postmarkInfo) {
                    return false;
                } else {
                    let obj = {};
                    obj['status_code'] = 200;
                    postmarkInfo.push(obj)
                    return postmarkInfo;
                }
            })
            .catch((err) => {
                let obj = new Error("ORM error");
                obj.status_code = 500;
                obj.err = err;
                throw obj;
            })
        return postmarkInfo;
    } catch (err) {

    }
}
async function getLocationIntroduce(locationID) {
    Locations.hasMany(Location_postmarks)
    try {
        const locationDatas = await checkLocationID(locationID);
        if (locationDatas === false) {
            throw new Error("please enter the correct location id");
        }
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
            .then((locationIntroduce) => {
                let obj = {};
                obj['status_code'] = 200;
                locationIntroduce.push(obj)
                return locationIntroduce;
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
    checkUploadLocationPostmark, getLocationIntroduce, getPostmarkInfo
}