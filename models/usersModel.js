const { Users } = require('../connection_db');

async function profileShow(userID) {
    return Users.findOne({
        where: {
            id: userID
        }
    })
}

module.exports = {
    profileShow
}