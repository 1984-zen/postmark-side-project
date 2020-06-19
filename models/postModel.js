const { Posts, Post_imgs } = require('../connection_db');

function postModelShow(userID) {
    return Posts.findAll(
        {
            where: {
                user_id: userID
            },
            include: [Post_imgs]
        }
    )
}
function postModelCreate(post) {
    return Posts.create(
        {
            content: post.content,
            user_id: post.user_id,
            location_id: post.location_id,
            create_time: post.create_time,
            update_time: post.update_time
        }
    )
}
async function postModelDelete(deletePostID) {
    let result = {};
    return new Promise(async (resolve, reject) => {
        checkID = await Posts.findOne(
            {
                where:
                {
                    id: deletePostID
                }
            }
        )
        if (!checkID) {
            result.err = `id ${deletePostID} is not exist`
            reject(result)
        } else {
            await Posts.destroy({ where: { id: deletePostID } })
            result.msg = `deleted post id ${deletePostID} successfully`;
            resolve(result)
        }
    })
}

module.exports = {
    postModelCreate, postModelDelete, postModelShow
}