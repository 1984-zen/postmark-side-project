const { Cities, Distributes } = require('../connection_db')

async function getCities() {
    try {
        const cities = await Distributes.findAll({
            include: [Cities]
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
                obj.err = err;
                throw obj;
            })
        return cities;
    } catch (err) {
        throw err;
    }
}
async function getHotCities() {
    const hotCities = await Cities.findAll({
        where: { id: [1, 2, 3, 4, 5, 6] }
    });
    if (!hotCities) {
        throw new Error('get hot cities failed')
    } else {
        return hotCities;
    }
}
async function citiesModelShow() {
    return await Cities.findAll()
}
async function citiesModelCreate(city) {
    return await Cities.create({
        name: city.cityName
    })
}
async function citiesModelPut(city) {
    let result = {};
    result.message = `update city successfully`;
    result.city_id = city.city_id;
    result.city_name = city.cityName;
    await Cities.update(
        {
            name: city.cityName
        },
        {
            where: { id: city.city_id }
        }
    )
    return result;
}
async function citiesModelDelete(cityID) {
    let result = {};
    checkID = await Cities.findOne(
        {
            where:
            {
                id: cityID
            }
        }
    )
    if (checkID === null) {
        result.message = `delete id does not exist`;
        result.error = { delete_id: cityID };
        return result;
    } else if (checkID) {
        result.message = `delete city successfully`;
        result.delete_id = cityID;
        await Cities.destroy({
            where: { id: cityID }
        })
        return result;
    }
}
module.exports = {
    citiesModelShow, citiesModelCreate, citiesModelDelete, citiesModelPut, getHotCities,
    getCities
}