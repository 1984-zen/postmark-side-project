const { Distributes } = require('../connection_db');
const { onTime } = require('./onTimeModel');

async function createDistribute(payload) {
    try {
        const distribute = await Distributes.create({
            name: payload.distributeName,
            create_time: onTime(),
            update_time: onTime()
        })
        .then((distribute) => {
            return [
                {
                    message: "admin create a distribute",
                    datas: distribute
                },
                {
                    status_code: 201
                }
            ];

        })
        .catch((err) => {
            let obj = new Error("ORM createDistribute error");
            obj.status_code = 500;
            obj.err = err;
            throw obj;
        })
        return distribute;
    }catch(err) {
        throw err;
    }
}
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
    checkDistribute, createDistribute
}