const { getTowns } = require('../../models/townsModel');

async function showTowns(req, res, next) {
    try {
        const towns = await getTowns();
        statusCode = towns.pop().status_code;
        res.status(statusCode)
        res.json({
            status: "get all towns successfully",
            result: towns
        })
    } catch (err) {
        statusCode = err.status_code;
        res.status(statusCode)
        res.json({
            status: "get all towns failed",
            result: err.message
        })
    }
}

module.exports = {
    showTowns
}