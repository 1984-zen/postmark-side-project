const { getHotCities } = require('../../models/citiesModel')

async function showHot6Cities(req, res, next) {
    try {
        const result = await getHotCities();
        res.json({
            status: "get hot cities successfully",
            status_code: 201,
            result: result
        })
    } catch (err) {
        res.json({
            status: "get hot cities failed",
            status_code: 400,
            result: err.message
        })
    }
}

module.exports = {
    showHot6Cities
}