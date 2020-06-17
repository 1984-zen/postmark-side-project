const { Cities, Towns } = require('../connection_db');
const { checkCityID } = require('./citiesModel');

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
    getTowns
}