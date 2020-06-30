const { checkCityID } = require('../../models/citiesModel');
const { createTown } = require('../../models/townsModel')

async function createTownByAdmin(req, res, next) {
    try {
        const payload = {
            townName: req.body.townName,
            cityID: req.body.cityID
        }
        if (payload.townName === undefined || payload.cityID === undefined) {
            throw {
                message: {
                    message: "please fill townName or cityID",
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
        const [message, status_code] = await createTown(payload);
        res.status(status_code.status_code)
        res.json({
            status: "create town successfuly",
            result: message
        })
    } catch (err) {
        const statusCode = err.status_code;
        res.status(statusCode)
        res.json({
            status: "create town failed",
            result: err.message,
            test: err,
            dev: err.stack
        })
    }
}

module.exports = {
    createTownByAdmin
}