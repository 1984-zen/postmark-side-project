const checkLogin = require('../models/loginModel');

module.exports = class Login {
    postLogin(req, res, next) {
        const users = {
            account: req.body.account,
            password: req.body.password
        }
        checkLogin(users)
            .then(result => {
                res.json({
                    status: "登入成功。",
                    result: result
                })
            })
            .catch(err => {
                res.json({
                    status: "登入失敗。",
                    result: err
                })
            })
    }
}