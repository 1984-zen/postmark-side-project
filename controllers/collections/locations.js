const { getCollectionCountsFromLocations } = require('../../models/collectionsModel');
const { getCollectionPostsFromLocation } = require('../../models/collectionsModel');

async function showCollectionPostsFromLocation(req, res, next) {
    try {
        const userID = req.user.id;
        const locationID = req.params.id;
        const postsFromLocation = await getCollectionPostsFromLocation(userID, locationID);
        const statusCode = postsFromLocation.pop().status_code;
        res.status(statusCode)
        res.json({
            status: "get collected posts from location successfully",
            result: postsFromLocation
        })
    } catch (err) {
        const statusCode = err.status_code;
        res.status(statusCode)
        res.json({
            status: "get collected posts from location failed",
            result: err.message,
            test: err,
            dev: err.stack
        })
    }
}
async function showCollectionCountsFromLocations(req, res, next) {
    try {
        const userID = req.user.id;
        const collectionCountsFromLocations = await getCollectionCountsFromLocations(userID);
        const statusCode = collectionCountsFromLocations.status_code
        res.status(statusCode)
        res.json({
            status: "count this user has collected posts from locations successfully",
            result: collectionCountsFromLocations
        })
    } catch (err) {
        const statusCode = err.status_code;
        res.status(statusCode)
        res.json({
            status: "count this user has collected posts from locations failed",
            result: err.message,
        })
    }
}

module.exports = {
    showCollectionCountsFromLocations, showCollectionPostsFromLocation
}