const { getLatestPosts } = require('../../models/postsModel');

async function showLatestPosts(req, res, next) {
    try {
        const result = await getLatestPosts();
        const statusCode = result.pop().status_code;
        res.status(statusCode)
        res.json({
            status: "get latest 9 posts successfully",
            result: {
                message: "get latest 9 posts successfully",
                datas: result
            }
        })
    } catch (err) {
        res.status(err.status_code)
        res.json({
            status: "get latest 9 posts failed",
            result: {
                message: "get latest 9 posts failed",
                datas: err.message,
                // test: err,
                // dev: err.stack
            }
        })
    }
}

module.exports = {
    showLatestPosts
}