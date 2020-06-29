const { Users } = require('../connection_db')

exports.tokenAuth = async function verifyToken(req, res, next) {
    const requestToken = req.headers.apiToken;
    if (requestToken === undefined) {
        res.json({
            err: "請輸入api_token！"
        })
        return;
    }
    const checkUser = await Users.findOne({ where: { api_token: requestToken } })
    if (checkUser == null) {
        res.json({
            result: {
                status: "api_token錯誤。",
                err: "請重新登入。"
            }
        })
        return;
    } else {
        req.user = checkUser
        next();
    }
}