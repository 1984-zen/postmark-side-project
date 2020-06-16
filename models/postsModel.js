const { Posts, User_postmarks, Cities, Locations } = require('../connection_db');

async function getLatestPosts() {
Posts.belongsTo(Cities, {foreignKey: "city_id"})
Posts.belongsTo(Locations, {foreignKey: "location_id"})
Posts.hasMany(User_postmarks, {foreignKey: "post_id"})
    try {
        const result = await Posts.findAll({
            limit: 9,
            order: [['create_time', 'DESC']],
            attributes: ['id','create_time'],
            include: [
                {
                    model: User_postmarks,
                    attributes: ['postmark_img','imprint_date']
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
    getLatestPosts
}