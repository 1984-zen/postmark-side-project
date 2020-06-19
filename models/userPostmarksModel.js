const { User_postmarks } = require('../connection_db');

async function createPostmark(payload){
    try{
        const isCreate = await User_postmarks.create({
            postmark_img: payload.imgPath,
            imprint_date: payload.imprintDate,
            post_id: payload.postID
        })
        .then(isCreate => {
            return [
                {
                    message: "create one post",
                    postID: payload.postID,
                    postmark_img: payload.imgPath,
                    imprint_date: payload.imprintDate,
                    content: payload.content
                },
                {
                    status_code: 201
                }
            ]
        })
        return isCreate;
    }catch(err){
        throw err;
    }
}

module.exports = {
    createPostmark
}