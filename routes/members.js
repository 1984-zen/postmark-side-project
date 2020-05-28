const express = require('express');
const router = express.Router();
const multer = require('multer');

const RsgisterController = require('../controllers/registerController');
const registerController = new RsgisterController();
const LoginController = require('../controllers/loginController');
const loginController = new LoginController();
const UserStampsController = require('../controllers/userStampsController');
const userStampsController = new UserStampsController();
const verifyToken = require('../models/verifyTokenModel')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/upload')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Allowed only .png, .jpg, .jpeg and .gif'));
        }
    }
});

router.post('/register', registerController.postRegister);
router.post('/login', loginController.postLogin);
router.post('/stamps', verifyToken.tokenAuth, upload.single('image'), userStampsController.postStamp);
router.delete('/stamps/:id', verifyToken.tokenAuth, userStampsController.deleteStamp);

module.exports = router;