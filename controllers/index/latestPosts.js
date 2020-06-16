const { getLatestPosts } = require('../../models/postsModel');

async function showLatestPosts(req, res, next) {
    try {
        const result = await getLatestPosts();
        const statusCode = result.pop().status_code;
        res.status(statusCode)
        res.json({
            status: "get latest 9 posts successfully",
            result: result
        })
    } catch (err) {
        res.status(err.status_code)
        res.json({
            status: "get latest 9 posts failed",
            result: err.message
        })
    }
}

module.exports = {
    showLatestPosts
}