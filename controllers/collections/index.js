const { showCollectionCountsFromCities } = require('./cities');
const { showCollectionCountsFromLocations, showCollectionPostsFromLocation } = require('./locations');
const { updatePostCollectonStatus } = require('./posts')

module.exports = {
    showCollectionCountsFromCities, showCollectionCountsFromLocations, showCollectionPostsFromLocation, updatePostCollectonStatus
}