const { postModelCreate } = require('../models/postModel');
const { postImgModelCreate } = require('../models/postImgModel');
const fs = require('fs');

module.exports = class Post {
    async postPost(req, res, next) {
        const post = {
            imgPath: `/images/upload/${req.file.originalname}`,
            location_id: req.body.location_id,
            content: req.body.content,
            user_id: req.user.id,
            create_time: onTime(),
            update_time: onTime()
        }
        let postCreate = await postModelCreate(post)
        const newPath = `public/images/upload/${req.file.originalname}`;
        fs.rename(req.file.path, newPath, (err) => {
            postImgModelCreate(postCreate, post)
        })
        res.json({
            status: "upload post successfully",
            result: post
        })
    }
}
const onTime = () => {
    const date = new Date();
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    const hh = date.getHours();
    const mi = date.getMinutes();
    const ss = date.getSeconds();

    return [date.getFullYear(), "-" +
        (mm > 9 ? '' : '0') + mm, "-" +
        (dd > 9 ? '' : '0') + dd, " " +
        (hh > 9 ? '' : '0') + hh, ":" +
        (mi > 9 ? '' : '0') + mi, ":" +
        (ss > 9 ? '' : '0') + ss
    ].join('');
}