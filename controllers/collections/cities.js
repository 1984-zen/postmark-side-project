const { getCollectionCountsFromCities } = require('../../models/collectionsModel');

async function showCollectionCountsFromCities(req, res, next) {
    try {
        const userID = req.user.id
        const collectionCountsFromCities = await getCollectionCountsFromCities(userID);
        const statusCode = collectionCountsFromCities.pop().status_code;
        res.status(statusCode)
        res.json({
            status: "count this user has collected posts from cities successfully",
            result: collectionCountsFromCities
        })
    } catch (err) {
        const statusCode = err.status_code;
        res.status(statusCode)
        res.json({
            status: "count this user has collected posts from cities failed",
            result: err.message,
            test: err,
            dev: err.stack
        })
    }
}

module.exports = {
    showCollectionCountsFromCities
}