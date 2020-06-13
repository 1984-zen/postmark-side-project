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
        const locations = await getLocations();
        const statusCode = locations.pop().status_code;
        res.status(statusCode)
        res.json({
            status: "get all locations successfully",
            result: locations
        })
    } catch (err) {
        const statusCode = err.status_code;
        res.status(statusCode)
        res.json({
            status: "get all locations failed",
            result: err.message
        })

    }
}

module.exports = {
    showLocations, showLocationInfo
}