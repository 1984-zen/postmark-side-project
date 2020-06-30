const { createCityByAdmin } = require('./cities');
const { createTownByAdmin } = require('./towns');
const { createLocationByAdmin } = require('./locations');
const { createLocationPostmarkByAdmin } = require('./postmarks');

module.exports = {
    createCityByAdmin, createTownByAdmin, createLocationByAdmin, createLocationPostmarkByAdmin
}