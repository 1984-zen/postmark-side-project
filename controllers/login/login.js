const { checkLogin, checkUser, updateUserToken } = require('../../models/usersModel');
const crypto = require('crypto');
const makeToken = require('../../models/makeTokenModel');
var logger = require("../../models/logger");

module.exports = async function (req, res, next) {
    try {
        const payload = {
            account: req.body.account,
            password: null,
        };
        if (payload.account === undefined || payload.password === undefined) {
            throw {
                message: "please fill up account or password",
                status_code: 422
            }
        }
        //hash password
        let hashPassword = crypto.createHash('sha1');
        hashPassword.update(req.body.password);
        hashPassword = hashPassword.digest('hex');
        //update payload.password
        payload.password = hashPassword;
        const hasUser = await checkUser(payload);
        if (hasUser === false) {
            throw {
                message: {
                    message: "account or password incorrected"
                },
                status_code: 401

            }
        }
        const api_token = makeToken(20);
        //update payload
        payload.userID = hasUser;
        payload.api_token = api_token;
        const isUpdateUserToken = await updateUserToken(payload);
        if (isUpdateUserToken === false) {
            throw {
                message: {
                    message: "update user token failed"
                },
                status_code: 500
            }
        }
        const [message, status_code] = await checkLogin(payload);
        res.status(status_code.status_code)
        res.json({
            status: "login successfully",
            result: {
                message: "login successfully",
                datas: message,
            }
        });
    } catch (err) {
        const statusCode = err.status_code;
        res.status(statusCode)
        res.json({
            status: "login failed",
            result: {
                message: err.message,
                datas: [],
                // test: err,
                // dev: err.stack
            }
        });
        logger.err(JSON.stringify({
            status_code: err.status_code,
            err_message: `login failed`,
            err_reason: err.message.message,
            input_account: req.body.account,
            input_password: req.body.password
        }))
    }
};
