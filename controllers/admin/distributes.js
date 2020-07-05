const { createDistribute, checkDistributeID, modifyDistribute } = require('../../models/distributesModel');

async function updateDistributeByAdmin(req, res, next) {
    try {
        const payload = {
            distributeName: req.body.distributeName,
            distributeID: req.params.id
        }
        const hasDistributeID = await checkDistributeID(payload)
        if (hasDistributeID === false) {
            throw {
                message: {
                    message: "this distribute id does not exist",
                },
                status_code: 400
            }
        }
        const [message, status_code] = await modifyDistribute(payload)
        res.status(status_code.status_code)
        res.json({
            status: "update distribute successfuly",
            result: message
        })
    } catch (err) {
        const statusCode = err.status_code;
        res.status(statusCode)
        res.json({
            status: "update distribute failed",
            result: err.message,
            test: err,
            dev: err.stack
        })
    }
}
async function createDistributeByAdmin(req, res, next) {
    try {
        const payload = {
            distributeName: req.body.distributeName,
        }
        if (payload.distributeName === undefined) {
            throw {
                message: {
                    message: "please fill distributeName",
                },
                status_code: 400
            }
        }
        const [message, status_code] = await createDistribute(payload);
        res.status(status_code.status_code)
        res.json({
            status: "create distribute successfuly",
            result: message
        })
    }catch(err) {
        const statusCode = err.status_code;
        res.status(statusCode)
        res.json({
            status: "create distribute failed",
            result: err.message,
            test: err,
            dev: err.stack
        })
    }
}

module.exports = {
    createDistributeByAdmin, updateDistributeByAdmin
}