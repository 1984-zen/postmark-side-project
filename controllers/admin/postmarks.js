const { careateLocationPostmark, checkLocationPostmarkID, modifyLocationPostmark, destroyLocationPostmark } = require('../../models/locationPostmarksModel');
const { checkLocationID } = require('../../models/locationsModel');
const fs = require('fs');

async function deleteLocationPostmarkByAdmin(req, res, next) {
    try {
        const locationPostmarkID = req.params.id;
        const hasLocationPostmarkID = await checkLocationPostmarkID(locationPostmarkID)
        if (hasLocationPostmarkID === false) {
            throw {
                message: {
                    message: "this location postmark id does not exist",
                },
                status_code: 400
            }
        }
        const [message, status_code] = await destroyLocationPostmark(locationPostmarkID);
        res.status(status_code.status_code)
        res.json({
            status: "delete location postmark successfuly",
            result: message
        })
    } catch (err) {
        const statusCode = err.status_code;
        res.status(statusCode)
        res.json({
            status: "delete location postmark failed",
            result: err.message,
            test: err,
            dev: err.stack
        })
    }
}
async function updateLocationPostmarkByAdmin(req, res, next) {
    try {
        let payload = {
            description: req.body.description,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            remark: req.body.remark,
            author: req.body.author,
            locationID: req.params.location_id,
            locationPostmarkID: req.params.postmark_id
        }
        const locationPostmarkImgPath = checkLocationPostmarkImgPath(req.file)
        if (locationPostmarkImgPath) {
            payload.imgPath = locationPostmarkImgPath
        }
        const hasLocationID = await checkLocationID(payload.locationID)
        if (hasLocationID === false) {
            throw {
                message: {
                    message: "this location id does not exist",
                },
                status_code: 400
            }
        }
        const hasLocationPostmarkID = await checkLocationPostmarkID(payload.locationPostmarkID)
        if (hasLocationPostmarkID === false) {
            throw {
                message: {
                    message: "this location postmark id does not exist",
                },
                status_code: 400
            }
        }
        const [message, status_code] = await modifyLocationPostmark(payload)
        res.status(status_code.status_code)
        res.json({
            status: "update location postmark successfuly",
            result: message
        })
    } catch (err) {
        const statusCode = err.status_code;
        res.status(statusCode)
        res.json({
            status: "update location postmark failed",
            result: err.message,
            test: err,
            dev: err.stack
        })
    }
}
function checkLocationPostmarkImgPath(postmarkFile) {
    if (!postmarkFile) {
        return false;
    } else {
        let locationPostmarkImgPath = `/images/upload/${postmarkFile.originalname}`;
        const newPath = `public/images/upload/${postmarkFile.originalname}`;
        fs.rename(postmarkFile.path, newPath, (err) => {
            if (err) throw err;
        });
        return locationPostmarkImgPath;
    }
}
async function createLocationPostmarkByAdmin(req, res, next) {
    try {
        const locationPostmarkImgPath = checkLocationPostmarkImgPath(req.file)
        if (locationPostmarkImgPath === false) {
            throw {
                message: {
                    message: "please upload location postmark photo",
                },
                status_code: 400
            }
        }
        let payload = {
            descreiption: req.body.descreiption,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            remark: req.body.remark,
            author: req.body.author,
            locationID: req.body.locationID,
            imgPath: locationPostmarkImgPath
        }
        if (payload.startDate === undefined || payload.locationID === undefined) {
            throw {
                message: {
                    message: "please fill startDate or locationID",
                },
                status_code: 400
            }
        }
        const hasLocationID = await checkLocationID(payload.locationID)
        if (hasLocationID === false) {
            throw {
                message: {
                    message: "this location id does not exist",
                },
                status_code: 400
            }
        }
        const [message, status_code] = await careateLocationPostmark(payload);
        res.status(status_code.status_code)
        res.json({
            status: "create location postmark successfuly",
            result: message
        })
    } catch (err) {
        const statusCode = err.status_code;
        res.status(statusCode)
        res.json({
            status: "create location postmark failed",
            result: err.message,
            test: err,
            dev: err.stack
        })
    }
}

module.exports = {
    createLocationPostmarkByAdmin, updateLocationPostmarkByAdmin, deleteLocationPostmarkByAdmin
}