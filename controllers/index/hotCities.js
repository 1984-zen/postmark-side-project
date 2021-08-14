const { getHotCities } = require('../../models/citiesModel');

async function showHotCities(req, res, next) {
    try {
        const cities = await getHotCities();
        const statusCode = cities.pop().status_code;
        res.status(statusCode)
        res.json({
            status: "get hot cities successfully",
            result: {
                message: "get hot cities successfully",
                datas: cities
            }
        })
    } catch (err) {
        const statusCode = err.status_code;
        res.status(statusCode)
        res.json({
            status: "get hot cities failed",
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
    showHotCities: showHotCities
}