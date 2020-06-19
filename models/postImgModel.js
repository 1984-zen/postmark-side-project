const { Post_imgs } = require('../connection_db')

async function postImgModelCreate(postCreate, post) {
    await Post_imgs.create(
        {
            img_url: post.imgPath,
            post_id: postCreate.id,
            create_time: post.create_time,
            update_time: post.update_time
        }
    )
}

module.exports = {
    postImgModelCreate
}