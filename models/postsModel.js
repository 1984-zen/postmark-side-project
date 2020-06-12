const { Posts, User_postmarks } = require('../connection_db');

async function getLatest6Posts() {
    try {
        const result = await Posts.findAll({
            include: [User_postmarks],
            limit: 1,
            order: [['create_time', 'DESC']]
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
                obj.err = err;
                throw obj;
            })
        return result;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getLatest6Posts
}