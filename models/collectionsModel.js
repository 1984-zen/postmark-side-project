const { Collections, Cities } = require('../connection_db');
const Sequelize = require('sequelize');

async function getCollectionCountsFromCities(userID) {
    try {
        const collectionCountsResult = await Cities.findAll({
            raw: true,
            include: [
                {
                    model: Collections,
                    where: {
                        user_id: userID
                    },
                    attributes: [
                        [Sequelize.fn('COUNT', Sequelize.col('user_id')), 'count_collections']
                    ]
                }
            ],
            group: ['cities.id']
        })
        .then((collectionCountsResult) => {
            let obj = {};
            obj['status_code'] = 200;
            collectionCountsResult.push(obj)
            return collectionCountsResult;
        })
        .catch((err) => {
            let obj = new Error("ORM error");
            obj.status_code = 500;
            obj.err = err;
            throw obj;
        })
        return collectionCountsResult;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getCollectionCountsFromCities
}