const { createDistributeByAdmin } = require('./distributes');
const { createCityByAdmin, updateCityByAdmin, deleteCityByAdmin } = require('./cities');
const { createTownByAdmin, updateTownByAdmin, deleteTownByAdmin } = require('./towns');
const { createLocationByAdmin, updateLocationByAdmin, deleteLocationByAdmin } = require('./locations');
const { createLocationPostmarkByAdmin, updateLocationPostmarkByAdmin, deleteLocationPostmarkByAdmin } = require('./postmarks');

module.exports = {
    createCityByAdmin, createTownByAdmin, createLocationByAdmin, createLocationPostmarkByAdmin, updateCityByAdmin,
    updateTownByAdmin, updateLocationByAdmin, updateLocationPostmarkByAdmin, deleteCityByAdmin, deleteTownByAdmin,
    deleteLocationByAdmin, deleteLocationPostmarkByAdmin, createDistributeByAdmin
}