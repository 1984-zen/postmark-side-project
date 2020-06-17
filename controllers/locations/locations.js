const { getLocations, getLocationInfo } = require('../../models/locationsModel');

async function showLocationInfo(req, res, next) {
    try {
        const locationID = req.params.id;
        const locationInfo = await getLocationInfo(locationID);
        const statusCode = locationInfo.pop().status_code;
        res.status(statusCode)
        res.json({
            status: "get location infomation successfully",
            result: locationInfo
        })
    } catch (err) {
        const statusCode = err.status_code;
        res.status(statusCode)
        res.json({
            status: "get location infomation failed",
            result: err.message
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
            result: locations
        })
    } catch (err) {
        res.json({
            status: "get all locations failed",
            result: err.message,
            // test: err,
            // dev: err.stack
        })
        const statusCode = err.status_code;
        res.status(statusCode)

    }
}

module.exports = {
    showLocations, showLocationInfo
}