const { Posts, User_postmarks, Cities, Locations, Users } = require('../connection_db');

async function checkPost(postID) {
    const hasDatas = await Posts.findAll({
        where: {
            id: postID
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
async function getPost(postID) {
    Posts.hasMany(User_postmarks, { foreignKey: 'post_id' })
    Posts.belongsTo(Users, { foreignKey: 'user_id' })
    Posts.belongsTo(Locations, { foreignKey: 'location_id' })
    try {
        const hasDatas = await checkPost(postID)
        if (hasDatas === false) {
            throw new Error("please enter the correct post id")
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
    getLatestPosts, getPost
}