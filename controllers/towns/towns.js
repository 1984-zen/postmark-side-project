const { getTowns } = require('../../models/townsModel');

async function showTowns(req, res, next) {
    try {
        cityID = req.params.id;
        const towns = await getTowns(cityID);
        statusCode = towns.pop().status_code;
        res.status(statusCode)
        res.json({
            status: "get all towns successfully",
            result: {
                message: "get all towns successfully",
                datas: towns
            }
        })
    } catch (err) {
        res.json({
            status: "get all towns failed",
            result: {
                message: err.message,
                datas: [],
                // test: err,
                // dev: err.stack
            }
        })
        statusCode = err.status_code;
        res.status(statusCode)
    }
}

module.exports = {
    showTowns
}