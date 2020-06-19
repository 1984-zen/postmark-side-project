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

module.exports = {
    postModelCreate, postModelShow
}