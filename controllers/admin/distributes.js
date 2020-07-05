const { createDistribute } = require('../../models/distributesModel');

async function createDistributeByAdmin(req, res, next) {
    try {
        const payload = {
            distributeName: req.body.distributeName,
        }
        const [message, status_code] = await createDistribute(payload);
        res.status(status_code.status_code)
        res.json({
            status: "create distribute successfuly",
            result: message
        })
    }catch(err) {
        // const statusCode = err.status_code;
        // res.status(statusCode)
        res.json({
            status: "create distribute failed",
            result: err.message,
            test: err,
            dev: err.stack
        })
    }
}

module.exports = {
    createDistributeByAdmin
}