const { Collections, Cities, Locations, Location_postmarks, Posts, User_postmarks, sequelize } = require('../connection_db');
const Sequelize = require('sequelize');

async function getCollectionCountsFromLocations(userID) {
    try {
        const collectionCountsResult = await Collections.findAll({
            // raw: true,
            where: {
                user_id: userID,
            },
            // attributes: [
                //             [Sequelize.fn('COUNT', Sequelize.col('id')), 'count_collections']
                //         ],
                // require: false,
                include: [{
                    model: Posts,
                on: {
                    locationId: sequelize.where(sequelize.col("Posts.locationId"),
                        "=",
                        sequelize.col("Collections.locationId"))
                },
                // attributes: [],
                // require: false
            },
            {
                model: User_postmarks,
                on: {
                    post_id: sequelize.where(sequelize.col("Collections.postId"),
                        "=",
                        sequelize.col("User_postmarks.post_id"))
                },
                attributes: ['postmark_img'], //若不Select欄位就不顯示，但一定要有空值，才不會預設去找主key
                require: false
            }
            ],
            // group: ['locations.id', 'locations.post_id', 'user_postmarks.post_id', 'user_postmarks.postmark_img']
            // {
            //     model: Collections,
            //     where: {
            //         user_id: userID
            //     },
            //     attributes: [
            //         [Sequelize.fn('COUNT', Sequelize.col('user_id')), 'count_collections']
            //     ]
            // },
            // {
            //     model: Posts,
            //     attributes: ['postmark_img'],
            //     required: false
            // }
            // ],
            // group: ['locations.id', 'posts.id','user_postmarks.id']
        })
        // .then((collectionCountsResult) => {
        //     let obj = {};
        //     obj['status_code'] = 200;
        //     collectionCountsResult.push(obj)
        //     return collectionCountsResult;
        // })
        // .catch((err) => {
        //     let obj = new Error("ORM error");
        //     obj.status_code = 500;
        //     obj.err = err;
        //     throw obj;
        // })
        return collectionCountsResult;
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
    getCollectionCountsFromCities, getCollectionCountsFromLocations
}