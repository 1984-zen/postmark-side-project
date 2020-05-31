const { Cities } = require('../connection_db')

async function citiesModelShow() {
    return await Cities.findAll()
}
async function citiesModelCreate(city) {
    return await Cities.create({
        name: city.cityName
    })
}
async function citiesModelDelete(cityID) {
    result = {};
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
    citiesModelShow, citiesModelCreate, citiesModelDelete
}