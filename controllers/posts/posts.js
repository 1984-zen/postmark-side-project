const { getPost, modifyPost, destroyPost, createPostIntroduce } = require('../../models/postsModel');
const { createPostmark, modifyPostImprintDate } = require('../../models/userPostmarksModel');
const { checkLocationID } = require('../../models/locationsModel')
const fs = require('fs');

function checkPostmarkImgPath(postmarkFile) {
    if (!postmarkFile) {
        return false;
    } else {
        let postmarkImgPath = `/images/upload/${postmarkFile.originalname}`;
        const newPath = `public/images/upload/${postmarkFile.originalname}`;
        fs.rename(postmarkFile.path, newPath, (err) => {
            if (err) throw err;
        });
        return postmarkImgPath;
    }
}
async function createPost(req, res, next) {
    try {
        const postmarkImgPath = checkPostmarkImgPath(req.file)
        if (postmarkImgPath === false) {
            throw new Error("please upload postmark photo");
        }
        let payload = {
            content: req.body.content,
            userID: req.user.id,
            cityID: req.body.cityID,
            locationID: req.body.locationID,
            imprintDate: req.body.imprintDate,
            postID: null,
            imgPath: postmarkImgPath
        }
        if(payload.locationID === undefined || payload.imprintDate === undefined){
            throw new Error("please fill locationID or imprintDate")
        }
        const post = await createPostIntroduce(payload)
        if(post === false) {
            throw new Error("create post content failed")
        }
        //update payload:
        payload.postID = post.dataValues.id;
        const [message, status_code] = await createPostmark(payload);
        res.status(status_code.status_code)
        res.json({
            status: "create post successfully",
            result: message
        });
    } catch(err) {
        res.json({
            status: "create post failed",
            result: err.message
        })
        const statusCode = err.status_code;
        res.status(statusCode)
        console.log(err.stack)
    }
}
async function deletePost(req, res, next) {
    try {
        const postID = req.post.id;
        const [message, status_code] = await destroyPost(postID);
        const statusCode = status_code.status_code;
        res.status(statusCode)
        res.json({
            status: "delete post successfully",
            result: message
        })
    } catch (err) {
        res.json({
            status: "delete post failed",
            result: err.message,
        })
        const statusCode = err.status_code;
        res.status(statusCode)
        console.log(err.stack)
    }
}
async function updatePost(req, res, next) {
    try {
        const payload = {
            content: req.body.content,
            locationID: req.body.locationID,
            postID: req.post.id,
            imprintDate: req.body.imprintDate
        }
        if(payload.imprintDate){
            const updateImprintDate = await modifyPostImprintDate(payload)
        }
        if(payload.locationID) {
            const hasLocation = await checkLocationID(payload.locationID)
            if(hasLocation === false){
                throw {
                    message: {
                        message: "this location id does not exist",
                    },
                    status_code: 400
                }
            }
        }
        const [message, status_code] = await modifyPost(payload);
        const statusCode = status_code.status_code;
        res.status(statusCode)
        res.json({
            status: "update post successfully",
            result: message
        })
    } catch (err) {
        res.json({
            status: "update post failed",
            result: err.message,
        })
        const statusCode = err.status_code;
        res.status(statusCode)
        console.log(err.stack)
    }
}
async function showPost(req, res, next) {
    try {
        const postID = req.params.id;
        const [post, status_code] = await getPost(postID);
        res.status(status_code.status_code)
        res.json({
            status: "get post successfully",
            result: post
        })
        console.log(err.stack)
    } catch (err) {
        const statusCode = err.status_code;
        res.status(statusCode)
        res.json({
            status: "get post failed",
            result: err.message,
        })
    }
}

module.exports = {
    showPost, updatePost, deletePost, createPost
}