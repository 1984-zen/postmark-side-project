const { checkUploadLocationPostmark, getPostmark, getPostmarkInfo } = require("../../models/locationPostmarksModel");
const fs = require('fs');

async function showPostmarkInfo(req, res, next) {
    try {
        const postmarkID = req.params.id;
        const postmarkInfo = await getPostmarkInfo(postmarkID);
        const statusCode = postmarkInfo.pop().status_code;
        res.status(statusCode)
        res.json({
            status: "get location postmark infomation successfully",
            result: postmarkInfo
        })
    } catch (err) {
        const statusCode = err.status_code;
        res.status(statusCode)
        res.json({
            status: "get location postmark infomation failed",
            result: err.message
        })
    }
}
async function createPostmark(req, res, next) {
    try {
        let payload = {
            locationID: req.body.locationID,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            description: req.body.description,
            remark: req.body.remark,
            imgPath: checkPostmarkImgPath()
        };
        function checkPostmarkImgPath(checkAdminUploadImg) {
            if (!checkAdminUploadImg) {
                return false;
            } else {
                let postmarkImgPath = `/images/upload/${req.file.originalname}`;
                const newPath = `public/images/upload/${req.file.originalname}`;
                fs.rename(req.file.path, newPath, (err) => {
                    if (err) throw err;
                });
                return postmarkImgPath;
            }
        }
        if (payload.startDate === undefined || payload.endDate === undefined) {
            throw new Error("please fill startDate or endDate");
        }
        const postmarkImgPath = checkPostmarkImgPath(checkAdminUploadImg = req.file)
        if (postmarkImgPath === false) {
            throw new Error("please upload postmark photo");
        }
        const result = await checkUploadLocationPostmark(payload);
        res.json({
            status: "create postmark successfully",
            status_code: 201,
            result: result
        });
    } catch (err) {
        console.log(err)
        res.json({
            status: "create postmark failed",
            status_code: 400,
            result: err.message
        });
    }
}

module.exports = {
    createPostmark, showPostmarkInfo
}