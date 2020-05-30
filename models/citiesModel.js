const { Cities } = require('../connection_db')

async function citiesModelShow(){
    return await Cities.findAll()
}

module.exports = {
    citiesModelShow
}