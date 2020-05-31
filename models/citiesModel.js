const { Cities } = require('../connection_db')

async function citiesModelShow() {
    return await Cities.findAll()
}
async function citiesModelCreate(city) {
    return await Cities.create({
        name: city.cityName
    })
}

module.exports = {
    citiesModelShow, citiesModelCreate
}