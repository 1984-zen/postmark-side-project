const { createCity, modifyCity, checkCityID, destroyCity } = require('../../models/citiesModel');
const { checkDistributeID } = require('../../models/distributesModel');
const fs = require('fs');

async function deleteCityByAdmin(req, res, next) {
    try {
        const cityID = req.params.id;
        const hasCityID = await checkCityID(cityID)
        if (hasCityID === false) {
            throw {
                message: "this city id does not exist",
                status_code: 422
            }
        }
        const [message, status_code] = await destroyCity(cityID);
        res.status(status_code.status_code)
        res.json({
            status: "delete city successfuly",
            result: {
                message: "delete city successfuly",
                datas: message
            }
        })
    } catch (err) {
        const statusCode = err.status_code;
        res.status(statusCode)
        res.json({
            status: "delete city failed",
            result: {
                message: err.message,
                datas: [],
                // test: err,
                // dev: err.stack
            }
        })
    }
}
async function updateCityByAdmin(req, res, next) {
    try {
        const payload = {
            cityName: req.body.cityName,
            distributeID: req.body.distributeID,
            cityID: req.params.id
        }
        const cityImgPath = checkCityImgPath(req.file)
        if (cityImgPath) {
            payload.imgPath = cityImgPath
        }
        const hasDistributeID = await checkDistributeID(payload)
        if (hasDistributeID === false) {
            throw {
                message: "this distribute id does not exist",
                status_code: 422
            }
        }
        const hasCityID = await checkCityID(payload.cityID)
        if (hasCityID === false) {
            throw {
                message: "this city id does not exist",
                status_code: 422
            }
        }
        const [message, status_code] = await modifyCity(payload)
        res.status(status_code.status_code)
        res.json({
            status: "update city successfuly",
            result: {
                message: "update city successfuly",
                datas: message
            }
        })
    } catch (err) {
        const statusCode = err.status_code;
        res.status(statusCode)
        res.json({
            status: "update city failed",
            result: {
                message: err.message,
                datas: [],
                // test: err,
                // dev: err.stack
            }
        })
    }
}
function checkCityImgPath(cityFile) {
    if (!cityFile) {
        return false;
    } else {
        let cityImgPath = `/images/upload/${cityFile.originalname}`;
        const newPath = `public/images/upload/${cityFile.originalname}`;
        fs.rename(cityFile.path, newPath, (err) => {
            if (err) throw err;
        });
        return cityImgPath;
    }
}
async function createCityByAdmin(req, res, next) {
    try {
        let payload = {
            cityName: req.body.cityName,
            distributeID: req.body.distributeID,
        }
        const cityImgPath = checkCityImgPath(req.file)
        if (cityImgPath) {
            payload.imgPath = cityImgPath
        }
        if (payload.cityName === undefined || payload.distributeID === undefined) {
            throw {
                message: "please fill cityName or distributeID",
                status_code: 422
            }
        }
        const hasDistributeID = await checkDistributeID(payload)
        if (hasDistributeID === false) {
            throw {
                message: "this distribute id does not exist",
                status_code: 422
            }
        }
        const [message, status_code] = await createCity(payload);
        res.status(status_code.status_code)
        res.json({
            status: "create city successfuly",
            result: {
                message: "create city successfuly",
                datas: message
            }
        })
    } catch (err) {
        const statusCode = err.status_code;
        res.status(statusCode)
        res.json({
            status: "create city failed",
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
    createCityByAdmin, updateCityByAdmin, deleteCityByAdmin
}