const { Posts } = require('../connection_db')

async function verifyPostAuth(req, res, next) {
    try {
        const postID = req.params.id;
        const hasDatas = await Posts.findAll({
            where: {
                id: postID
            }
        })
            .then(([hasDatas]) => {
                if (!hasDatas) {
                    const errDatas = {
                        errMessage: "this post id does not exsit",
                        status_code: 400
                    }
                    throw errDatas;
                } else if (hasDatas.dataValues.user_id !== req.user.id) {
                    let errDatas = {
                        errMessage: "this user has no authorization with this post",
                        status_code: 401
                    }
                    throw errDatas;
                }
                else {
                    req.post = hasDatas
                    next();
                    return req.post
                }
            })
            .catch((errDatas) => {
                let obj = {}
                if (errDatas.status_code === undefined) {
                    obj.status_code = 500;
                } else {
                    obj.status_code = errDatas.status_code;
                }
                if (!errDatas.message) {
                    obj.message = errDatas.errMessage
                } else {
                    obj.message = errDatas.message
                }
                throw obj;
            })
    } catch (err) {
        const statusCode = err.status_code;
        res.status(statusCode)
        res.json({
            status: "validate post auth failed",
            result: err
        })
        console.log(err.stack)
    }
}

module.exports = {
    verifyPostAuth
}