const { getPost, modifyPost } = require('../../models/postsModel');

async function updatePost(req, res, next) {
    try {
        const payload = {
            content: req.body.content,
            locationID: req.body.locationID,
            postID: req.post.id
        }
        const [message, status_code] = await modifyPost(payload);
        const statusCode = status_code.status_code;
        res.status(statusCode)
        res.json({
            status: "update post successfully",
            result: message
        })
    } catch (err) {
        res.json({
            status: "update post failed",
            result: err.message,
        })
        const statusCode = err.status_code;
        res.status(statusCode)
        console.log(err.stack)
    }
}
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
        })
        const statusCode = err.status_code;
        res.status(statusCode)
        console.log(err.stack)
    }
}

module.exports = {
    showPost, updatePost
}