const { Location_postmarks, Locations, sequelize } = require("../connection_db");

async function getPostmark(locationID) {
    try {
        const locationDatas = await checkLocationID(locationID);
        if (locationDatas === false) {
            throw new Error("please enter the correct location id");
        }
        const postmark = await Locations.findAll({
            where: {
                id: locationID
            },
            include: [
                {
                    model: Location_postmarks,
                    on: { id: sequelize.where(sequelize.col("Locations.location_postmarksId"), "=", sequelize.col("Location_postmarks.id")) },
                    require: false
                }
            ]
        })
            .then((postmark) => {
                let obj = {};
                obj['status_code'] = 200;
                postmark.push(obj)
                return postmark;
            })
            .catch((err) => {
                let obj = new Error("ORM error");
                obj.status_code = 500;
                obj.err = err;
                throw obj;
            })
        return postmark;
    } catch (err) {
        throw err;
    }
}
async function checkLocationID(locationID) {
    const locationDatas = await Locations.findOne({
        where: {
            id: locationID
        }
    });
    if (!locationDatas) {
        return false;
    } else {
        return locationDatas;
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
    checkUploadLocationPostmark, getPostmark
}