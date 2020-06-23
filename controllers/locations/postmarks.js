const { checkUploadLocationPostmark, getLocationPostmarkList, getLocationPostmarkIntroduce } = require("../../models/locationPostmarksModel");
const { checkLocationID } = require('../../models/locationsModel');
const fs = require('fs');

async function showLocationPostmarkList(req, res, next) {
    try {
        const locationID = req.params.id;
        const hasLocation = checkLocationID(locationID)
        // try to use Promise.then() to handle messages
        const [message, status_code] = await hasLocation.then(hasLocation => {
            if (hasLocation === false) {
                throw {
                    message: {
                        message: "this location id does not exist",
                    },
                    status_code: 400
                }
            }
            return getLocationPostmarkList(hasLocation.dataValues.id)
        }).then(([locationPostmarkList]) => {
            return [
                {
                    message: "get some postmarks data",
                    datas: locationPostmarkList
                },
                {
                    status_code: 202
                }
            ]
        })
        res.status(status_code.status_code)
        res.json({
            status: "get location postmarks list successfully",
            result: message
        })
    } catch (err) {
        const statusCode = err.status_code;
        res.status(statusCode)
        res.json({
            status: "get location postmarks list failed",
            result: err.message
        })
        console.log(err.stack)
    }
}
async function showLocationPostmarkIntroduce(req, res, next) {
    try {
        const postmarkID = req.params.id;
        const postmarkIntroduceResult = await getLocationPostmarkIntroduce(postmarkID);
        const statusCode = postmarkIntroduceResult.pop().status_code;
        res.status(statusCode)
        res.json({
            status: "get location postmark introduce successfully",
            result: postmarkIntroduceResult
        })
    } catch (err) {
        res.json({
            status: "get location postmark introduce failed",
            result: err.message
        })
        const statusCode = err.status_code;
        res.status(statusCode)
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
    createPostmark, showLocationPostmarkIntroduce, showLocationPostmarkList
}