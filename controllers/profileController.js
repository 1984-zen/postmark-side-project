const { profileShow } = require('../models/usersModel');
const { stampModelShowLimit6 } = require('../models/stampModel');

module.exports = class User {
    async showUserProfile(req, res, next) {
        let result = {};
        const userID = req.user.id;
        const userProfile = await profileShow(userID);
        const userStamps = await stampModelShowLimit6(userID)
        result.userProfile = userProfile;
        result.userStamps = userStamps;
        res.json(
            result
        )
    }
}