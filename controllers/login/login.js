const { checkLogin } = require("../../models/usersModel");

module.exports = async function (req, res, next) {
    try {
        const payload = {
            account: req.body.account,
            password: req.body.password,
        };
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
