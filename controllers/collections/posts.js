const { modifyPostCollectonStatus } = require('../../models/collectionsModel');

async function updatePostCollectonStatus(req, res, next) {
    try {
        const userID = req.user.id;
        const postID = req.body.postID;
        const cityID = req.body.cityID;
        const locationID = req.body.locationID;
        const updateResult = await modifyPostCollectonStatus(userID, postID, cityID, locationID);
        const statusCode = updateResult.status_code;
        res.status(statusCode)
        res.json({
            status: "update post collection successfully",
            result: updateResult
        })
    } catch(err) {
        const statusCode = err.status_code;
        res.status(statusCode)
        res.json({
            status: "update post collection failed",
            result: err.message,
            test: err,
            dev: err.stack
        })
    }
}

module.exports = {
    updatePostCollectonStatus
}