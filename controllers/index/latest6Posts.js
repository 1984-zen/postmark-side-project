const { getLatest6Posts } = require('../../models/postsModel');

async function showLatest6Posts(req, res, next) {
    try {
        const result = await getLatest6Posts();
        const statusCode = result.pop().status_code;
        res.status(statusCode)
        res.json({
            status: "get latest 6 posts successfully",
            result: result
        })
    } catch (err) {
        res.status(err.status_code)
        res.json({
            status: "get latest 6 posts failed",
            result: err.message
        })
    }
}

module.exports = {
    showLatest6Posts
}