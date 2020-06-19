const { getProfile } = require('../../models/usersModel');

async function showProfile(req, res, next) {
    try {
    const userID = req.params.id;
    const [message, status_code] = await getProfile(userID)
    res.status(status_code.status_code)
    res.json({
        status: "get user profile successfully",
        result: message
    });
    } catch(err){
        res.json({
            status: "get user profile failed",
            result: err.message,
            dev:err.stack
        })
        const statusCode = err.status_code;
        res.status(statusCode)
        console.log(err.stack)
    }
}

module.exports = {
    showProfile
}