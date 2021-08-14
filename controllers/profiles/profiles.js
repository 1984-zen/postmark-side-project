const { getProfile, modifyProfile } = require('../../models/usersModel');
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
async function updateProfile(req, res, next) {
    try {
        const postmarkImgPath = checkPostmarkImgPath(req.file)
        const payload = {
            userID: req.user.id,
            password: req.body.password,
            name: req.body.name,
            headImg: postmarkImgPath
        }
        const [message, status_code] = await modifyProfile(payload)
        
        res.status(status_code.status_code)
        res.json({
            status: "modify user profile successfully",
            result: {
                message: "modify user profile successfully",
                datas: message
            }
        });
    } catch (err) {
        res.json({
            status: "modify user profile failed",
            result: {
                message: err.message,
                datas: [],
                // test: err,
                // dev: err.stack
            }
        })
        const statusCode = err.status_code;
        res.status(statusCode)
    }
}
async function showProfile(req, res, next) {
    try {
        const userID = req.params.id;
        const [message, status_code] = await getProfile(userID)
        res.status(status_code.status_code)
        res.json({
            status: "get user profile successfully",
            result: {
                message: "get user profile successfully",
                datas: message
            }
        });
    } catch (err) {
        res.json({
            status: "get user profile failed",
            result: {
                message: err.message,
                datas: [],
                // test: err,
                // dev: err.stack
            }
        })
        const statusCode = err.status_code;
        res.status(statusCode)
        console.log(err.stack)
    }
}

module.exports = {
    showProfile, updateProfile
}