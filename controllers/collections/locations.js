const { getCollectionCountsFromLocations } = require('../../models/collectionsModel');
const { getCollectionPostsFromLocation } = require('../../models/collectionsModel');
const { checkLocationID } = require('../../models/locationsModel');

async function showCollectionPostsFromLocation(req, res, next) {
    try {
        const userID = req.user.id;
        const locationID = req.params.id;
        const locationDatas = await checkLocationID(locationID);
        if (locationDatas === false) {
            throw {
                message: "this location id does not exist",
                statusCode: 422
            }
        }
        const postsFromLocation = await getCollectionPostsFromLocation(userID, locationID);
        const statusCode = postsFromLocation.pop().status_code;
        res.status(statusCode)
        res.json({
            status: "get collected posts from location successfully",
            result: {
                message: "get collected posts from location successfully",
                datas: postsFromLocation
            }
        })
    } catch (err) {
        const statusCode = err.status_code;
        res.status(statusCode)
        res.json({
            status: "get collected posts from location failed",
            result: {
                message: err.message,
                data: [],
                // test: err,
                // dev: err.stack
            }
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
            result: {
                message: "count this user has collected posts from locations successfully",
                datas: collectionCountsFromLocations
            }
        })
    } catch (err) {
        const statusCode = err.status_code;
        res.status(statusCode)
        res.json({
            status: "count this user has collected posts from locations failed",
            result: {
                message: err.message,
                datas: [],
                // test: err,
                // dev: err.stack
            }
        })
    }
}

module.exports = {
    showCollectionCountsFromLocations, showCollectionPostsFromLocation
}