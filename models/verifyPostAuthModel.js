const { Posts } = require('../connection_db')

exports.verifyPostAuth = async function (req, res, next) {
    const checkPostAuth = await Posts.findAll({ where: { user_id: req.user.id, id: req.params.id } })
    const checkNull = await Posts.findAll({ where: { id: req.params.id } })
    if (checkNull.length === 0) {
        res.json({
            err: `post id ${req.params.id} does not exist`
        })
    }
    else if (checkPostAuth.length === 0) {
        res.json({
            err: "update failed, because user does not has this post's authorization"
        })
        return
    } else {
        req.post = checkPostAuth[0];
        next();
    }
}