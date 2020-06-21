const { createPostmark, showLocationPostmarkIntroduce, showLocationPostmarkList } = require('./postmarks');
const { showLocations, showLocation } = require('./locations');
const { showLocationPosts } = require('./posts');

module.exports = {
    createPostmark, showLocations, showLocationPostmarkIntroduce, showLocation, showLocationPostmarkList, showLocationPosts
}