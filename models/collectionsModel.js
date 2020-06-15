const { Collections, Cities, Locations, Location_postmarks, Posts, User_postmarks, sequelize } = require('../connection_db');
const Sequelize = require('sequelize');
const { checkLocationID } = require('./locationsModel');

async function getCollectionPostsFromLocation(userID, locationID) {
    try {
        const locationDatas = await checkLocationID(locationID);
        if (locationDatas === false) {
            throw new Error("please enter the correct location id");
        }
        const posts = await Collections.findAll({
            where: {
                user_id: userID,
                locationID: locationID
            },
            attributes: ['id'],
            include: [
                {
                    model: Posts,
                    attributes: ['id'],
                    include: [
                        {
                            model: User_postmarks,
                            attributes: ['id', 'imprint_date', 'postmark_img']
                        }
                    ]
                }
            ]
        })
            .then((posts) => {
                let obj = {};
                obj['status_code'] = 200;
                posts.push(obj)
                return posts;
            })
            .catch((err) => {
                console.log(err)
                let obj = new Error("ORM error");
                obj.status_code = 500;
                obj.err = err;
                throw obj;
            })
        return posts;
    } catch (err) {
        throw err;
    }
}
async function getCollectionCountsFromLocations(userID) {
    try {
        let results = {};
        const collectionCountsResult = await Collections.findAll({
            raw: true,
            where: {
                user_id: userID,
            },
            attributes: [
                'locationId', [Sequelize.fn('COUNT', Sequelize.col('*')), 'count_collections']
            ],
            require: false,
            group: ['Collections.locationId']
        })
            .then((collectionCountsResult) => {
                results['collectionCountsResult'] = collectionCountsResult;
            })
            .catch((err) => {
                let obj = new Error("ORM error");
                obj.status_code = 500;
                obj.err = err;
                throw obj;
            })
        const collectionImageResult = await Collections.findAll({
            where: {
                user_id: userID,
            },
            include: [{
                model: User_postmarks,
                on: {
                    post_id: sequelize.where(sequelize.col("Collections.postId"),
                        "=",
                        sequelize.col("User_postmarks.postId"))
                },
                attributes: ['postmark_img'], //若不Select欄位就不顯示，但一定要有空值，才不會預設去找主key
                require: false
            }],
        })
            .then(async (collectionImageResult) => {
                results['collectionImageResult'] = collectionImageResult;
                results['status_code'] = 200;
            })
            .catch((err) => {
                let obj = new Error("ORM error");
                obj.status_code = 500;
                obj.err = err;
                throw obj;
            })
        return results;
    } catch (err) {
        throw err;
    }
}
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
    getCollectionCountsFromCities, getCollectionCountsFromLocations, getCollectionPostsFromLocation
}