const { Posts, User_postmarks, Cities, Locations, Users } = require('../connection_db');
const { checkLocationID } = require('./locationsModel');
const { checkCityID } = require('./citiesModel');

async function createPostIntroduce(payload) {
    try {
        const locationDatas = await checkLocationID(payload.locationID);
        if (locationDatas === false) {
            throw new Error("this location id does not exist");
        }
        const cityDatas = await checkCityID(payload.cityID)
        if (cityDatas === false) {
            throw new Error("this city id does not exist");
        }
        const isCreate = await Posts.create({
            content: payload.content,
            user_id: payload.userID,
            city_id: payload.cityID,
            location_id: payload.locationID
        })
        .then((isCreate) => {
            if (!isCreate) {
                return false;
            } else {
                return isCreate;
            }
        })
        .catch((err) => {
            let obj = new Error("ORM error");
            obj.status_code = 500;
            obj.err = err;
            throw obj;
        })
        return isCreate;
    }catch(err){
        throw err;
    }
}
async function destroyPost(postID) {
    try {
        const isDelete = await Posts.destroy({
            where: {
                id: postID
            }
        })
            .then((isDelete) => {
                return [
                    {
                        message: "one post has been deleted",
                        post_id: postID
                    },
                    {
                        status_code: 204
                    }
                ]
            })
        return isDelete;
    } catch (err) {
        throw err;
    }
}
async function modifyPost(payload) {
    try {
        const isUpdate = await Posts.update(
            {
                content: payload.content,
                location_id: payload.locationID
            },
            {
                where: {
                    id: payload.postID
                }
            }
        )
            // isUpdate is array[0] or [1]
            .then(([isUpdate]) => {
                    return [
                        {
                            message: "something changed",
                            content: payload.content,
                            location_id: payload.locationID,
                            imprintDate: payload.imprintDate
                        },
                        {
                            status_code: 201
                        }
                    ]
                
            })
            .catch((err) => {
                let obj = new Error("ORM error");
                obj.status_code = 500;
                obj.err = err.message;
                throw obj;
            })
        return isUpdate;
    } catch (err) {
        throw err;
    }
}
async function getPost(postID) {
    Posts.hasMany(User_postmarks, { foreignKey: 'post_id' })
    Posts.belongsTo(Users, { foreignKey: 'user_id' })
    Posts.belongsTo(Locations, { foreignKey: 'location_id' })
    try {
        const hasDatas = await checkPostID(postID) 
        if (hasDatas === false) {
            throw {
                message: {
                    message: "this post id does not exist",
                },
                status_code: 422
            }
        }
        const post = await Posts.findAll({
            where: {
                id: postID
            },
            attributes: ['id', 'content', 'location_id'],
            include: [
                {
                    model: User_postmarks,
                    attributes: ['id', 'postmark_img', 'imprint_date']
                },
                {
                    model: Users,
                    attributes: ['id', 'name']
                },
                {
                    model: Locations,
                    attributes: ['id', 'name', 'address']
                }
            ]
        })
            .then((post) => {
                let obj = {};
                obj['status_code'] = 200;
                post.push(obj)
                return post;
            })
            .catch((err) => {
                console.log(err)
                let obj = new Error("ORM error");
                obj.status_code = 500;
                obj.err = err.message;
                throw obj;
            })
        return post;
    } catch (err) {
        throw err;
    }
}
async function checkPostID(postID) {
        const postDatas = await Posts.findOne({
            where: {
                id: postID
            }
        })
            .then((postDatas) => {
                if (!postDatas) {
                    return false;
                } else {
                    return postDatas;
                }
            })
            .catch((err) => {
                let obj = new Error("ORM error");
                obj.status_code = 500;
                obj.err = err;
                throw obj;
            })
        return postDatas;
}
async function getLatestPosts() {
    Posts.belongsTo(Cities, { foreignKey: "city_id" })
    Posts.belongsTo(Locations, { foreignKey: "location_id" })
    Posts.hasMany(User_postmarks, { foreignKey: "post_id" })
    try {
        const result = await Posts.findAll({
            limit: 9,
            order: [['create_time', 'DESC']],
            attributes: ['id', 'create_time'],
            include: [
                {
                    model: User_postmarks,
                    attributes: ['postmark_img', 'imprint_date']
                },
                {
                    model: Cities,
                    attributes: ['name']
                },
                {
                    model: Locations,
                    attributes: ['name']
                }
            ]
        })
            .then((result) => {
                let obj = {};
                obj['status_code'] = 200;
                result.push(obj)
                return result;
            })
            .catch((err) => {
                console.log(err)
                let obj = new Error("ORM error");
                obj.status_code = 500;
                obj.err = err.message;
                throw obj;
            })
        return result;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getLatestPosts, getPost, modifyPost, destroyPost, createPostIntroduce
}