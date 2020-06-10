const { Location_postmarks, Locations } = require("../connection_db");

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
    checkUploadLocationPostmark
}