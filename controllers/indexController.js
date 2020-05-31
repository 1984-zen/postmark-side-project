const { citiesModelShow } = require('../models/citiesModel');
const { stampList } = require('../models/locationsModel');

module.exports = class City {
    async showCities(req, res, next) {
        let cities = await citiesModelShow();
        res.json({
            cities: cities
        })
    }
    async showStamps(req, res, next){
        const cityID = req.params.id;
        let stamps = await stampList(cityID)
        res.json({
            city_id: cityID,
            stamps: stamps
        })
    }
}