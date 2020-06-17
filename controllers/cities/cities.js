const { getCities } = require('../../models/citiesModel')

async function showCities(req, res, next) {
    try {
        const cities = await getCities();
        const statusCode = cities.pop().status_code;
        res.status(statusCode)
        res.json({
            status: "get all cities successfuly",
            result: cities
        })
    } catch (err) {
        const statusCode = err.status_code;
        res.status(statusCode)
        res.json({
            status: "get all cities failed",
            result: err.message,
            // test: err,
            // dev: err.stack
        })
    }
}

module.exports = {
    showCities
}