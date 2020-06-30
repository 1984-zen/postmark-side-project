const { showLocationPostmarkIntroduce, showLocationPostmarkList } = require('./postmarks');
const { showLocations, showLocationIntroduce } = require('./locations');
const { showLocationPosts } = require('./posts');

module.exports = {
    showLocations, showLocationPostmarkIntroduce, showLocationIntroduce, showLocationPostmarkList, showLocationPosts
}