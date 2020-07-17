const { checkLogin } = require("../../models/usersModel");
const crypto = require('crypto');

module.exports = async function (req, res, next) {
    try {
        const payload = {
            account: req.body.account,
            password: null,
        };
        let hashPassword = crypto.createHash('sha1');
        hashPassword.update(req.body.password);
        hashPassword = hashPassword.digest('hex');
        //update payload.password
        payload.password = hashPassword;
        if (payload.account === undefined || payload.password === undefined) {
            throw new Error("please fill account or password");
        } else {
            const result = await checkLogin(payload);
            res.json({
                status: "login successfully",
                status_code: 201,
                result: result,
            });
        }
    } catch (err) {
        res.json({
            status: "login failed",
            status_code: 400,
            result: err.message,
        });
    }
};
