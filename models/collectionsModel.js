const { Collections, Cities, Locations, Location_postmarks, Posts, User_postmarks, sequelize } = require('../connection_db');
const Sequelize = require('sequelize');
const { onTime } = require('./onTimeModel');

async function checkPostCollection(payload) {
    const hasDatas = await Collections.findAll({
        where: {
            user_id: payload.userID,
            postId: payload.postID
        }
    })
        .then((hasDatas) => {
            if (!hasDatas.length) {
                return false;
            } else {
                return hasDatas[0];
            }
        })
        .catch((err) => {
            let obj = new Error("ORM error");
            obj.status_code = 500;
            obj.err = err.message;
            throw obj;
        })
    return hasDatas;
}
async function modifyPostCollectonStatus(payload) {
    try {
        const hasCollected = await checkPostCollection(payload)
        if (hasCollected === false) {
            const addCollection = await Collections.create({
                postId: payload.postID,
                user_id: payload.userID,
                cityId: payload.cityID,
                locationId: payload.locationID,
                create_time: onTime(),
                update_time: onTime()
            })
                .then((addCollection) => {
                    let obj = {};
                    obj['status_code'] = 201;
                    obj['collectedPostID'] = addCollection.dataValues.id;
                    obj['message'] = 'collected this post successfully';
                    return obj;
                })
                .catch((err) => {
                    console.log(err)
                    let obj = new Error("ORM error");
                    obj.status_code = 500;
                    obj.err = err.message;
                    throw obj;
                })
            return addCollection;
        } else {
            const removeCollection = await Collections.destroy({
                where: { id: hasCollected.id }
            })
                .then((removeCollection) => {
                    let obj = {};
                    obj['status_code'] = 204;
                    obj['collectedPostID'] = hasCollected.id;
                    obj['message'] = 'remove this post collection successfully';
                    return obj;
                })
                .catch((err) => {
                    console.log(err)
                    let obj = new Error("ORM error");
                    obj.status_code = 500;
                    obj.err = err.message;
                    throw obj;
                })
            return removeCollection;
        }
    } catch (err) {
        throw err;
    }
}
async function getCollectionPostsFromLocation(userID, locationID) {
    Posts.hasMany(User_postmarks, { foreignKey: 'post_id' }) // 測試 new Error("內容")
    try {
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
                obj.status_code= 200;
                posts.push(obj)
                return posts;
            })
            .catch((err) => {
                let obj = new Error("ORM error: controllers -> showCollectionPostsFromLocation; models -> getCollectionPostsFromLocation"); // obj.message
                obj.status_code = 500;
                obj.sequelizeErr = err.message;
                throw obj;
            })
        return posts;
    } catch (err) {
        throw err;
    }
}
async function getCollectionCountsFromLocations(userID) {
    Collections.hasMany(User_postmarks)
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
                results.collectionCountsResult = collectionCountsResult;
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
                //Select * from collections where userid join user_postmarks on postId
                on: {
                    post_id: sequelize.where(sequelize.col("Collections.postId"),
                        "=",
                        sequelize.col("User_postmarks.post_id"))
                },
                attributes: ['postmark_img'], //若不Select欄位就不顯示，但一定要有空值，才不會預設去找主key
                require: false
            }],
        })
            .then(async (collectionImageResult) => {
                results.collectionImageResult= collectionImageResult;
                results.status_code = 200;
            })
            .catch((err) => {
                let obj = new Error("ORM error: controllers -> showCollectionCountsFromLocations; models -> getCollectionCountsFromLocations");
                obj.status_code = 500;
                obj.sequelizeErr = err.message;
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
                obj.status_code = 200;
                collectionCountsResult.push(obj)
                return collectionCountsResult;
            })
            .catch((err) => {
                let obj = new Error("ORM error: controllers -> showCollectionCountsFromCities; models -> getCollectionCountsFromCities");
                obj.status_code = 500;
                obj.sequelizeErr = err.message;
                throw obj;
            })
        return collectionCountsResult;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getCollectionCountsFromCities, getCollectionCountsFromLocations, getCollectionPostsFromLocation, modifyPostCollectonStatus
}