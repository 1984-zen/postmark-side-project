const { Users } = require('../connection_db')

exports.tokenAuth = async function verifyToken(req, res, next) {
    const requestToken = req.headers.apitoken;
    if (requestToken === undefined) {
        res.json({
            err: "please fill apitoken！"
        })
        return;
    }
    const checkUser = await Users.findOne({ where: { api_token: requestToken } })
    if (checkUser == null) {
        res.json({
            result: {
                status: "apitoken incorrectly。",
                err: "please log in again。"
            }
        })
        return;
    } else {
        req.user = checkUser
        next();
    }
}