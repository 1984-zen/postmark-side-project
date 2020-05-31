const express = require('express');
const router = express.Router();
const multer = require('multer');

const RsgisterController = require('../controllers/registerController');
const registerController = new RsgisterController();
const LoginController = require('../controllers/loginController');
const loginController = new LoginController();
const UserStampsController = require('../controllers/userStampsController');
const userStampsController = new UserStampsController();
const UserPostsController = require('../controllers/postController');
const userPostsController = new UserPostsController();
const IndexConstroller = require('../controllers/indexController');
const indexConstroller = new IndexConstroller();

const verifyToken = require('../models/verifyTokenModel');
const verifyPostAuth = require('../models/verifyPostAuthModel');
const verifyAdmin = require('../models/verifyAdminModel');
const verifyCity = require('../models/verifyCityModel');
const verifyLocation = require('../models/verifyLocationModel');

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
router.post('/posts', verifyToken.tokenAuth, upload.single('image'), userPostsController.postPost);
router.delete('/posts/:id', verifyToken.tokenAuth, upload.single('image'), userPostsController.deletePost);
router.put('/posts/:id', verifyToken.tokenAuth, verifyPostAuth.verifyPostAuth, upload.single('image'), userPostsController.putPost);
router.get('/index', indexConstroller.showCities);
router.get('/cities/:id', indexConstroller.showStamps);
router.post('/admin/cities', verifyToken.tokenAuth, verifyAdmin.AdminAuth, indexConstroller.createCity);
router.delete('/admin/cities/:id', verifyToken.tokenAuth, verifyAdmin.AdminAuth, indexConstroller.deleteCity);
router.put('/admin/cities/:id', verifyToken.tokenAuth, verifyAdmin.AdminAuth, verifyCity.checkCity, indexConstroller.putCity);
router.post('/admin/locations', verifyToken.tokenAuth, verifyAdmin.AdminAuth, indexConstroller.createLocation);
router.delete('/admin/locations/:id', verifyToken.tokenAuth, verifyAdmin.AdminAuth, verifyLocation.checkLocation, indexConstroller.deleteLocation);
router.put('/admin/locations/:id', verifyToken.tokenAuth, verifyAdmin.AdminAuth, verifyLocation.checkLocation, indexConstroller.putLocation);
router.post('/admin/stamps', verifyToken.tokenAuth, verifyAdmin.AdminAuth, upload.single('image'), indexConstroller.createStamp);

module.exports = router;