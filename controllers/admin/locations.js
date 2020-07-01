const { checkCityID } = require("../../models/citiesModel");
const { checkTownID } = require("../../models/townsModel");
const { createLocation, checkLocationID, modifyLocation, destroyLocation } = require('../../models/locationsModel');
const { checkLocationPostmarkID } = require('../../models/locationPostmarksModel');

async function deleteLocationByAdmin(req, res, next) {
    try {
        const locationID = req.params.id;
        const hasLocationID = await checkLocationID(locationID)
        if (hasLocationID === false) {
            throw {
                message: {
                    message: "this location id does not exist",
                },
                status_code: 400
            }
        }
        const [message, status_code] = await destroyLocation(locationID);
        res.status(status_code.status_code)
        res.json({
            status: "delete location successfuly",
            result: message
        })
    } catch (err) {
        const statusCode = err.status_code;
        res.status(statusCode)
        res.json({
            status: "delete location failed",
            result: err.message,
            test: err,
            dev: err.stack
        })
    }
}
async function updateLocationByAdmin(req, res, next) {
    try {
        let payload = {
            locationName: req.body.locationName,
            locationAddress: req.body.locationAddress,
            cityID: req.body.cityID,
            townID: req.body.townID,
            locationID: req.params.id
        }
        const locationPostmarkID = await checkLocationPostmarkID(req.body.locationPostmarkID)
        if (locationPostmarkID) {
            payload.locationPostmarkID = locationPostmarkID;
        } else {
            throw {
                message: {
                    message: "this location postmark id does not exist",
                },
                status_code: 400
            }
        }
        const hasCityID = await checkCityID(payload.cityID)
        if (hasCityID === false) {
            throw {
                message: {
                    message: "this city id does not exist",
                },
                status_code: 400
            }
        }
        const hasTownID = await checkTownID(payload.townID)
        if (hasTownID === false) {
            throw {
                message: {
                    message: "this town id does not exist",
                },
                status_code: 400
            }
        }
        const hasLocationID = await checkLocationID(payload.locationID)
        if (hasLocationID === false) {
            throw {
                message: {
                    message: "this location id does not exist",
                },
                status_code: 400
            }
        }
        const [message, status_code] = await modifyLocation(payload)
        res.status(status_code.status_code)
        res.json({
            status: "update location successfuly",
            result: message
        })
    } catch (err) {
        const statusCode = err.status_code;
        res.status(statusCode)
        res.json({
            status: "update location failed",
            result: err.message,
            test: err,
            dev: err.stack
        })
    }
}
async function createLocationByAdmin(req, res, next) {
    try {
        let payload = {
            locationName: req.body.locationName,
            locationAddress: req.body.locationAddress,
            cityID: req.body.cityID,
            townID: req.body.townID,
        }
        if (payload.locationName === undefined || payload.locationAddress === undefined || payload.cityID === undefined || payload.townID === undefined) {
            throw {
                message: {
                    message: "please fill locationName or locationAddress or cityID or townID",
                },
                status_code: 400
            }
        }
        const hasCityID = await checkCityID(payload.cityID)
        if (hasCityID === false) {
            throw {
                message: {
                    message: "this city id does not exist",
                },
                status_code: 400
            }
        }
        const hasTownID = await checkTownID(payload.townID)
        if (hasTownID === false) {
            throw {
                message: {
                    message: "this town id does not exist",
                },
                status_code: 400
            }
        }
        const locationPostmarkID = req.body.locationPostmarkID;
        let hasLocationPostmarkID = null;
        if (locationPostmarkID) {
            hasLocationPostmarkID = await checkLocationPostmarkID(locationPostmarkID)
        }
        if (hasLocationPostmarkID === false) {
            throw {
                message: {
                    message: "this hasLocationPostmarkID id does not exist",
                },
                status_code: 400
            }
        } else if (hasLocationPostmarkID) {
            payload.locationPostmarkID = req.body.locationPostmarkID;
        }
        const [message, status_code] = await createLocation(payload)
        res.status(status_code.status_code)
        res.json({
            status: "create location successfuly",
            result: message
        })
    } catch (err) {
        const statusCode = err.status_code;
        res.status(statusCode)
        res.json({
            status: "create location failed",
            result: err.message,
            test: err,
            dev: err.stack
        })
    }
}

module.exports = {
    createLocationByAdmin, createLocationByAdmin, updateLocationByAdmin, deleteLocationByAdmin
}