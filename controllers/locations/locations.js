const { getLocations } = require('../../models/locationsModel');
const { getLocationIntroduce } = require('../../models/locationPostmarksModel');

async function showLocation(req, res, next) {
    try {
        const locationID = req.params.id;
        const LocationIntroduce = await getLocationIntroduce(locationID);
        const statusCode = LocationIntroduce.pop().status_code;
        res.status(statusCode)
        res.json({
            status: "get location introduce successfully",
            result: LocationIntroduce
        })
    } catch (err) {
        res.json({
            status: "get location introduce failed",
            result: err.message,
            // test: err,
            // dev: err.stack
        })
        const statusCode = err.status_code;
        res.status(statusCode)
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
    showLocations, showLocation
}