const { getHotCities } = require('../../models/citiesModel');

async function showHotCities(req, res, next) {
    try {
        const cities = await getHotCities();
        const statusCode = cities.pop().status_code;
        res.status(statusCode)
        res.json({
            status: "get hot cities successfully",
            result: cities
        })
    } catch (err) {
        const statusCode = err.status_code;
        res.status(statusCode)
        res.json({
            status: "get hot cities failed",
            result: err.message
        })
    }
}

module.exports = {
    showHotCities: showHotCities
}