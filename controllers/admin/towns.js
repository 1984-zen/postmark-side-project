const { checkCityID } = require('../../models/citiesModel');
const { createTown, modifyTown, checkTownID, destroyTown } = require('../../models/townsModel')

async function deleteTownByAdmin(req, res, next) {
    try {
        const townID = req.params.id;
        const hasTownID = await checkTownID(townID)
        if (hasTownID === false) {
            throw {
                message: "this town id does not exist",
                status_code: 422
            }
        }
        const [message, status_code] = await destroyTown(townID);
        res.status(status_code.status_code)
        res.json({
            status: "delete town successfuly",
            result: {
                message: "delete town successfuly",
                datas: message
            }
        })
    } catch (err) {
        const statusCode = err.status_code;
        res.status(statusCode)
        res.json({
            status: "delete town failed",
            result: {
                message: err.message,
                datas: [],
                // test: err,
                // dev: err.stack
            }
        })
    }
}
async function updateTownByAdmin(req, res, next) {
    try {
        const payload = {
            townName: req.body.townName,
            cityID: req.body.cityID,
            townID: req.params.id
        }
        const hasCityID = await checkCityID(payload.cityID)
        if (hasCityID === false) {
            throw {
                message: "this city id does not exist",
                status_code: 422
            }
        }
        const hasTownID = await checkTownID(payload.townID)
        if (hasTownID === false) {
            throw {
                message: "this town id does not exist",
                status_code: 422
            }
        }
        const [message, status_code] = await modifyTown(payload)
        res.status(status_code.status_code)
        res.json({
            status: "update town successfuly",
            result: {
                message: "update town successfuly",
                datas: message
            }
        })
    } catch (err) {
        const statusCode = err.status_code;
        res.status(statusCode)
        res.json({
            status: "update town failed",
            result: {
                message: err.message,
                datas: [],
                // test: err,
                // dev: err.stack
            }
        })
    }
}
async function createTownByAdmin(req, res, next) {
    try {
        const payload = {
            townName: req.body.townName,
            cityID: req.body.cityID
        }
        if (payload.townName === undefined || payload.cityID === undefined) {
            throw {
                message: "please fill townName or cityID",
                status_code: 422
            }
        }
        const hasCityID = await checkCityID(payload.cityID)
        if (hasCityID === false) {
            throw {
                message: "this city id does not exist",
                status_code: 422
            }
        }
        const [message, status_code] = await createTown(payload);
        res.status(status_code.status_code)
        res.json({
            status: "create town successfuly",
            result: {
                message: "create town successfuly",
                datas: message
            }
        })
    } catch (err) {
        const statusCode = err.status_code;
        res.status(statusCode)
        res.json({
            status: "create town failed",
            result: {
                message: err.message,
                datas: [],
                // test: err,
                // dev: err.stack
            }
        })
    }
}

module.exports = {
    createTownByAdmin, updateTownByAdmin, deleteTownByAdmin
}