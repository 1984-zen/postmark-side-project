const { getLocations } = require('../../models/locationsModel');

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
    showLocations
}