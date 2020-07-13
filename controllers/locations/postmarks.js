const { getLocationPostmarkList, getLocationPostmarkIntroduce } = require("../../models/locationPostmarksModel");
const { checkLocationID } = require('../../models/locationsModel');
const fs = require('fs');

async function showLocationPostmarkList(req, res, next) {
    try {
        const locationID = req.params.id;
        const hasLocation = checkLocationID(locationID)
        // try to use Promise.then() to handle messages
        const [message, status_code] = await hasLocation.then(hasLocation => {
            if (hasLocation === false) {
                throw {
                    message: {
                        message: "this location id does not exist",
                    },
                    status_code: 400
                }
            }
            return getLocationPostmarkList(hasLocation.dataValues.id)
        }).then(([locationPostmarkList]) => {
            return [
                {
                    message: "get some postmarks data",
                    datas: locationPostmarkList
                },
                {
                    status_code: 200
                }
            ]
        })
        res.status(status_code.status_code)
        res.json({
            status: "get location postmarks list successfully",
            result: message
        })
    } catch (err) {
        const statusCode = err.status_code;
        res.status(statusCode)
        res.json({
            status: "get location postmarks list failed",
            result: err.message
        })
    }
}
async function showLocationPostmarkIntroduce(req, res, next) {
    try {
        const postmarkID = req.params.id;
        const postmarkIntroduceResult = await getLocationPostmarkIntroduce(postmarkID);
        const statusCode = postmarkIntroduceResult.pop().status_code;
        res.status(statusCode)
        res.json({
            status: "get location postmark introduce successfully",
            result: postmarkIntroduceResult
        })
    } catch (err) {
        res.json({
            status: "get location postmark introduce failed",
            result: err.message
        })
        const statusCode = err.status_code;
        res.status(statusCode)
    }
}

module.exports = {
    showLocationPostmarkIntroduce, showLocationPostmarkList
}