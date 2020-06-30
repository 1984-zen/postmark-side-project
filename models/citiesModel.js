const { Cities, Distributes } = require('../connection_db');
const { onTime } = require('./onTimeModel');

async function modifyCity(payload) {
    try {
        const isUpdate = await Cities.update(
            {
                name: payload.cityName,
                distribute_id: payload.distributeID,
                city_img: payload.imgPath,
                update_time: onTime()
            },
            {
                where: {
                    id: payload.cityID
                }
            }
        )
            .then(([isUpdate]) => {
                return [
                    {
                        message: "something changed",
                        datas: {
                            cityName: payload.cityName,
                            distributeID: payload.distributeID,
                            cityImg: payload.imgPath,
                        }
                    },
                    {
                        status_code: 200
                    }
                ]
            })
            .catch((err) => {
                let obj = new Error("ORM modifyCity error");
                obj.status_code = 500;
                obj.err = err.message;
                throw obj;
            })
        return isUpdate;
    } catch (err) {
        throw err;
    }
}
async function createCity(payload) {
    try {
        const city = await Cities.create({
            name: payload.cityName,
            distribute_id: payload.distributeID,
            city_img: payload.imgPath,
            create_time: onTime(),
            update_time: onTime()
        })
            .then((city) => {
                return [
                    {
                        message: "admin create a city",
                        datas: city
                    },
                    {
                        status_code: 201
                    }
                ];

            })
            .catch((err) => {
                let obj = new Error("ORM createCity error");
                obj.status_code = 500;
                obj.err = err;
                throw obj;
            })
        return city;
    } catch (err) {
        throw err;
    }
}
async function checkCityID(cityID) {
    try {
        const cityDatas = await Cities.findOne({
            where: {
                id: cityID
            }
        })
            .then((cityDatas) => {
                if (!cityDatas) {
                    return false;
                } else {
                    return cityDatas;
                }
            })
            .catch((err) => {
                let obj = new Error("ORM error");
                obj.status_code = 500;
                obj.err = err;
                throw obj;
            })
        return cityDatas;
    } catch (err) {
        throw err;
    }
}
async function getCities() {
    Distributes.hasMany(Cities, { foreignKey: "distribute_id" })
    try {
        const cities = await Distributes.findAll({
            attributes: ['id', 'name'],
            include: [
                {
                    model: Cities,
                    attributes: ['id', 'name']
                }
            ]
        })
            .then((cities) => {
                let obj = {};
                obj['status_code'] = 200;
                cities.push(obj)
                return cities;
            })
            .catch((err) => {
                let obj = new Error("ORM error");
                obj.status_code = 500;
                obj.err = err.message;
                throw obj;
            })
        return cities;
    } catch (err) {
        throw err;
    }
}
async function getHotCities() {
    const hotCities = await Cities.findAll({
        where: { id: [1, 2, 3, 4, 5, 6] },
        attributes: ['id', 'name', 'city_img']
    })
        .then((hotCities) => {
            if (!hotCities) {
                throw new Error('get hot cities failed')
            } else {
                let obj = {};
                obj['status_code'] = 200;
                hotCities.push(obj)
                return hotCities;
            }
        })
        .catch((err) => {
            let obj = new Error("ORM error");
            obj.status_code = 500;
            obj.err = err;
            throw obj;
        })
    return hotCities;
}

module.exports = {
    getHotCities, getCities, checkCityID, createCity, modifyCity
}