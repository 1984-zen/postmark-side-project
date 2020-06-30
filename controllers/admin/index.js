const { createCityByAdmin } = require('./cities');
const { createTownByAdmin } = require('./towns');
const { createLocationByAdmin } = require('./locations');

module.exports = {
    createCityByAdmin, createTownByAdmin, createLocationByAdmin
}