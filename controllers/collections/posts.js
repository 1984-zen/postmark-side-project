const { modifyPostCollectonStatus } = require('../../models/collectionsModel');

async function updatePostCollectonStatus(req, res, next) {
    try {
        const payload = {
            userID: req.user.id,
            postID: req.body.postID,
            cityID: req.body.cityID,
            locationID: req.body.locationID
        }
        if (payload.postID === undefined || payload.cityID === undefined || payload.locationID === undefined) {
            let obj = new Error("please fill userID or postID or locationID");
            obj.status_code = 422;
            throw obj;
        } else {
            const updateResult = await modifyPostCollectonStatus(payload);
            const statusCode = updateResult.status_code;
            res.status(statusCode)
            res.json({
                status: "update post collection successfully",
                result: {
                    message: "update post collection successfully",
                    datas: updateResult
                }
            })
        }
    } catch (err) {
        const statusCode = err.status_code;
        res.status(statusCode)
        res.json({
            status: "update post collection failed",
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
    updatePostCollectonStatus
}