const { Cities, Towns } = require('../connection_db');

async function getTowns() {
    try {
        const towns = await Cities.findAll({
            include: [Towns]
        })
            .then((towns) => {
                let obj = {};
                obj['status_code'] = 200;
                towns.push(obj)
                return towns;
            })
            .catch((err) => {
                let obj = new Error("ORM error");
                obj.status_code = 500;
                obj.err = err;
                throw obj;
            })
        return towns;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getTowns
}