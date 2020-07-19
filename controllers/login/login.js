const { checkLogin, checkUser, updateUserToken } = require('../../models/usersModel');
const crypto = require('crypto');
const makeToken = require('../../models/makeTokenModel');

module.exports = async function (req, res, next) {
    try {
        const payload = {
            account: req.body.account,
            password: null,
        };
        //hash password
        let hashPassword = crypto.createHash('sha1');
        hashPassword.update(req.body.password);
        hashPassword = hashPassword.digest('hex');
        //update payload.password
        payload.password = hashPassword;
        if (payload.account === undefined || payload.password === undefined) {
            throw {
                message: {
                    message: "please fill up account or password"
                },
                status_code: 400
            }
        }
        const hasUser = await checkUser(payload);
        if (hasUser === false) {
            throw {
                message: {
                    message: "account or password incorrected"
                },
                status_code: 400

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
            result: message,
        });
    } catch (err) {
        const statusCode = err.status_code;
        res.status(statusCode)
        res.json({
            status: "login failed",
            result: err.message,
        });
    }
};
