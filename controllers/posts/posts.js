const { getPost } = require('../../models/postsModel');

async function showPost(req, res, next) {
    try {
        const postID = req.params.id;
        const post = await getPost(postID);
        const statusCode = post.pop().status_code;
        res.status(statusCode)
        res.json({
            status: "get post successfully",
            result: post
        })
    } catch (err) {
        res.json({
            status: "get post failed",
            result: err.message,
            test: err,
            dev: err.stack
        })
        const statusCode = err.status_code;
        res.status(statusCode)
    }
}

module.exports = {
    showPost
}