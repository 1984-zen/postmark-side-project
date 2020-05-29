const { Posts } = require('../connection_db')

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
    postModelCreate
}