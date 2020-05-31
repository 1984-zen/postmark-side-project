const { citiesModelShow, citiesModelCreate, citiesModelDelete, citiesModelPut } = require('../models/citiesModel');
const { stampList, locationsModelCreate, locationsModelDelete, locationsModelPut, isLocationStampImg } = require('../models/locationsModel');
const { stampCreate } = require('../models/locationImgsModel');
const fs = require('fs');

module.exports = class City {
    async showCities(req, res, next) {
        let cities = await citiesModelShow();
        res.json({
            cities: cities
        })
    }
    async showStamps(req, res, next) {
        const cityID = req.params.id;
        let stamps = await stampList(cityID)
        res.json({
            city_id: cityID,
            stamps: stamps
        })
    }
    async createStamp(req, res, next) {
        const stamp = {
            name: req.body.stampName,
            location_id: req.body.location_id,
            img_url: `/images/upload/${req.file.originalname}`,
            create_time: onTime(),
            update_time: onTime()
        }
        const newPath = `public/images/upload/${req.file.originalname}`;
        fs.rename(req.file.path, newPath, async () => {
            let stampResult = await stampCreate(stamp)
            await isLocationStampImg(stampResult)
            res.json(stampResult)
        })
    }
    async createCity(req, res, next) {
        const city = {
            cityName: req.body.cityName,
            create_time: onTime(),
            update_time: onTime()
        }
        let createCity = await citiesModelCreate(city);
        res.json({
            message: `create city successfully`,
            reslut: {
                city_id: createCity.id,
                city_name: city.city_name
            }
        })
    }
    async putCity(req, res, next) {
        const city = {
            city_id: req.params.id,
            cityName: req.body.cityName
        }
        let putCity = await citiesModelPut(city);
        res.json(
            putCity
        )
    }
    async deleteCity(req, res, next) {
        const deleteID = req.params.id;
        let deleteCity = await citiesModelDelete(deleteID);
        res.json(
            deleteCity
        )
    }
    async createLocation(req, res, next) {
        const location = {
            name: req.body.name,
            address: req.body.address,
            city_id: req.body.city_id,
            create_time: onTime(),
            update_time: onTime()
        }
        let createLocation = await locationsModelCreate(location);
        res.json(
            createLocation
        )
    }
    async putLocation(req, res, next) {
        const location = {
            location_id: req.params.id,
            name: req.body.name,
            address: req.body.address,
            city_id: req.body.city_id,
        }
        let putLocation = await locationsModelPut(location);
        res.json({
            putLocation
        })
    }
    async deleteLocation(req, res, next) {
        const deleteID = req.params.id;
        let deleteLocation = await locationsModelDelete(deleteID);
        res.json(
            deleteLocation
        )
    }
}
const onTime = () => {
    const date = new Date();
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    const hh = date.getHours();
    const mi = date.getMinutes();
    const ss = date.getSeconds();

    return [date.getFullYear(), "-" +
        (mm > 9 ? '' : '0') + mm, "-" +
        (dd > 9 ? '' : '0') + dd, " " +
        (hh > 9 ? '' : '0') + hh, ":" +
        (mi > 9 ? '' : '0') + mi, ":" +
        (ss > 9 ? '' : '0') + ss
    ].join('');
}