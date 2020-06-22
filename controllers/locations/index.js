const { createPostmark, showLocationPostmarkIntroduce, showLocationPostmarkList } = require('./postmarks');
const { showLocations, showLocationIntroduce } = require('./locations');
const { showLocationPosts } = require('./posts');

module.exports = {
    createPostmark, showLocations, showLocationPostmarkIntroduce, showLocationIntroduce, showLocationPostmarkList, showLocationPosts
}