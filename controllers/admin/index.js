const { createCityByAdmin, updateCityByAdmin } = require('./cities');
const { createTownByAdmin, updateTownByAdmin } = require('./towns');
const { createLocationByAdmin, updateLocationByAdmin } = require('./locations');
const { createLocationPostmarkByAdmin } = require('./postmarks');

module.exports = {
    createCityByAdmin, createTownByAdmin, createLocationByAdmin, createLocationPostmarkByAdmin, updateCityByAdmin,
    updateTownByAdmin, updateLocationByAdmin
}