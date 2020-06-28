const { checkAccount, regist } = require('../../models/usersModel');

module.exports = async function (req, res, next) {
    try {
        const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        const payload = {
            account: req.body.account,
            password: req.body.password,
            rePassword: req.body.rePassword,
            name: req.body.name
        }
        if (payload.account === undefined || payload.password === undefined) {
            throw {
                message: {
                    message: "please fill account or password",
                },
                status_code: 400
            }
        } else if (payload.name === undefined) {
            throw {
                message: {
                    message: "please fill name",
                },
                status_code: 400
            }
        } else if (payload.password !== payload.rePassword) {
            throw {
                message: {
                    message: "enter the password differently",
                },
                status_code: 400
            }
        }
        const checkEmailRegexp = emailRegexp.test(payload.account)
        if (checkEmailRegexp === false) {
            throw {
                message: {
                    message: "account formate incorrectly, should be email formate",
                },
                status_code: 400
            }
        }
        const hasAccount = await checkAccount(payload)
        if (hasAccount === true) {
            throw {
                message: {
                    message: "this account has been registed",
                },
                status_code: 400
            }
        }
        const [message, status_code] = await regist(payload)
        res.status(status_code.status_code)
        res.json({
            status: "regist successfuly",
            result: message
        })
    } catch (err) {
        const statusCode = err.status_code;
        res.status(statusCode)
        res.json({
            status: "regist failed",
            result: err.message,
            // test: err,
            // dev: err.stack
        })
    }
}