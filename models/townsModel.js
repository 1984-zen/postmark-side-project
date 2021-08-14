const { Cities, Towns } = require('../connection_db');
const { checkCityID } = require('./citiesModel');
const { onTime } = require('./onTimeModel');

async function destroyTown(townID) {
    try {
        const isDelete = await Towns.destroy({
            where: {
                id: townID
            }
        })
            .then((isDelete) => {
                return [
                    {
                        message: "one town has been deleted",
                        town_id: townID
                    },
                    {
                        status_code: 204
                    }
                ]
            })
        return isDelete;
    } catch (err) {
        throw err;
    }
}
async function modifyTown(payload) {
    try {
        const isUpdate = await Towns.update(
            {
                name: payload.townName,
                city_id: payload.cityID,
                update_time: onTime()
            },
            {
                where: {
                    id: payload.townID
                }
            }
        )
            .then(([isUpdate]) => {
                return [
                    {
                        message: "something changed",
                        datas: {
                            townName: payload.townName,
                            cityID: payload.cityID
                        }
                    },
                    {
                        status_code: 201
                    }
                ]
            })
            .catch((err) => {
                let obj = new Error("ORM modifyTown error");
                obj.status_code = 500;
                obj.err = err.message;
                throw obj;
            })
        return isUpdate;
    } catch (err) {
        throw err;
    }
}
async function createTown(payload) {
    try {
        const town = await Towns.create({
            name: payload.townName,
            city_id: payload.cityID,
            create_time: onTime(),
            update_time: onTime()
        })
            .then((town) => {
                return [
                    {
                        message: "admin create a town",
                        data: town
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
        return town;
    } catch (err) {
        throw err;
    }
}
async function checkTownID(townID) {
    try {
        const townDatas = await Towns.findOne({
            where: {
                id: townID
            }
        })
            .then((townDatas) => {
                if (!townDatas) {
                    return false;
                } else {
                    return townDatas;
                }
            })
            .catch((err) => {
                let obj = new Error("ORM checkTownID error");
                obj.status_code = 500;
                obj.err = err;
                throw obj;
            })
        return townDatas;
    } catch (err) {
        throw err;
    }
}
async function getTowns(cityID) {
    Cities.hasMany(Towns, { foreignKey: "city_id" })
    try {
        const cityDatas = await checkCityID(cityID);
        if (cityDatas === false) {
            throw new Error("please enter the correct city id");
        }
        const towns = await Cities.findAll({
            where: {
                id: cityID
            },
            attributes: ['id', 'name'],
            include: [
                {
                    model: Towns,
                    attributes: ['id', 'name']
                }
            ]
        })
            .then((towns) => {
                let obj = {};
                obj['status_code'] = 200;
                towns.push(obj)
                return towns;
            })
            .catch((err) => {
                let obj = new Error("ORM error");
                obj.status_code = 500;
                obj.err = err;
                throw obj;
            })
        return towns;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getTowns, checkTownID, createTown, modifyTown, destroyTown
}