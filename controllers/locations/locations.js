const { getLocations, checkLocationID } = require('../../models/locationsModel');
const { getLocationIntroduce } = require('../../models/locationPostmarksModel');

async function showLocationIntroduce(req, res, next) {
    try {
        const locationID = req.params.id;
        const locationDatas = await checkLocationID(locationID);
        if (locationDatas === false) {
            throw {
                message: "this location id does not exist",
                status_code: 400
            }
        }
        const [message, status_code] = await getLocationIntroduce(locationID);
        res.status(status_code.status_code)
        res.json({
            status: "get location introduce successfully",
            result: {
                message: "get location introduce successfully",
                datas: message
            }
        })
    } catch (err) {
        const statusCode = err.status_code;
        res.status(statusCode)
        res.json({
            status: "get location introduce failed",
            result: {
                message: err.message,
                datas: []
            }
        })
    }
}
async function showLocations(req, res, next) {
    try {
        const townID = req.params.id;
        const locations = await getLocations(townID);
        const statusCode = locations.pop().status_code;
        res.status(statusCode)
        res.json({
            status: "get all locations successfully",
            result: {
                message: "get all locations successfully",
                datas: locations
            }
        })
    } catch (err) {
        res.json({
            status: "get all locations failed",
            result: {
                message: err.message,
                datas: [],
                // test: err,
                // dev: err.stack
            }
        })
        const statusCode = err.status_code;
        res.status(statusCode)

    }
}

module.exports = {
    showLocations, showLocationIntroduce
}