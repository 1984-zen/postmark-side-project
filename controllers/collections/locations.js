const { getCollectionCountsFromLocations } = require('../../models/collectionsModel');

async function showCollectionCountsFromLocations(req, res, next) {
    try {
        const userID = req.user.id;
        const collectionCountsFromLocations = await getCollectionCountsFromLocations(userID);
        // const statusCode = collectionCountsFromLocations.pop().status_code;
        // res.status(statusCode)
        res.json({
            status: "count this user has collected posts from locations successfully",
            result: collectionCountsFromLocations
        })
    } catch (err) {
        // const statusCode = err.status_code;
        // res.status(statusCode)
        res.json({
            status: "count this user has collected posts from locations failed",
            result: err.message,
            test: err,
            dev: err.stack
        })
    }
}

module.exports = {
    showCollectionCountsFromLocations
}