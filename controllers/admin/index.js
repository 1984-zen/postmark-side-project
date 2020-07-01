const { createCityByAdmin, updateCityByAdmin, deleteCityByAdmin } = require('./cities');
const { createTownByAdmin, updateTownByAdmin, deleteTownByAdmin } = require('./towns');
const { createLocationByAdmin, updateLocationByAdmin, deleteLocationByAdmin } = require('./locations');
const { createLocationPostmarkByAdmin, updateLocationPostmarkByAdmin } = require('./postmarks');

module.exports = {
    createCityByAdmin, createTownByAdmin, createLocationByAdmin, createLocationPostmarkByAdmin, updateCityByAdmin,
    updateTownByAdmin, updateLocationByAdmin, updateLocationPostmarkByAdmin, deleteCityByAdmin, deleteTownByAdmin,
    deleteLocationByAdmin
}