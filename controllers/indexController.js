const { citiesModelShow } = require('../models/citiesModel');

module.exports = class City {
    async showCities(req, res, next) {
        let cities = await citiesModelShow();
        res.json({
            cities: cities
        })
    }
}