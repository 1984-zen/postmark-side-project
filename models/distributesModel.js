const { Distributes } = require('../connection_db');

async function checkDistribute(payload) {
    hasDistributeID = await Distributes.findOne({
        where: {
            id: payload.distributeID
        },
        attribute: ['id']
    })
        .then(hasDistributeID => {
            if (hasDistributeID) {
                return true;
            } else {
                return false;
            }
        })
    return hasDistributeID
}

module.exports = {
    checkDistribute
}