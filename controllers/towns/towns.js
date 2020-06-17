const { getTowns } = require('../../models/townsModel');

async function showTowns(req, res, next) {
    try {
        cityID = req.params.id;
        const towns = await getTowns(cityID);
        statusCode = towns.pop().status_code;
        res.status(statusCode)
        res.json({
            status: "get all towns successfully",
            result: towns
        })
    } catch (err) {
        res.json({
            status: "get all towns failed",
            result: err.message,
            test: err,
            dev: err.stack
        })
        statusCode = err.status_code;
        res.status(statusCode)
    }
}

module.exports = {
    showTowns
}