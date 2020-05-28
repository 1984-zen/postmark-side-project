const { Users } = require('../connection_db')

exports.tokenAuth = async function verifyToken(req, res, next) {
    const requestToken = req.headers.api_token;
    const checkUser = await Users.findOne({ where: { api_token: requestToken } })

    if (!requestToken) {
        res.json({
            err: "請輸入token！"
        })
        return;
    } else if (checkUser == null) {
        res.json({
            result: {
                status: "token錯誤。",
                err: "請重新登入。"
            }
        })
        return;
    } else {
        req.user = checkUser
        next();
    }
}