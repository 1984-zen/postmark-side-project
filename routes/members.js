const express = require('express');
const router = express.Router();
const multer = require('multer');

const RsgisterController = require('../controllers/registerController');
const registerController = new RsgisterController();
const loginAction = require('../controllers/login');
const indexAction = require('../controllers/index');
const locationAction = require('../controllers/locations');
const cityAction = require('../controllers/cities');
const townAction = require('../controllers/towns');
const collectionAction = require('../controllers/collections');
const UserStampsController = require('../controllers/userStampsController');
const userStampsController = new UserStampsController();
const UserPostsController = require('../controllers/postController');
const userPostsController = new UserPostsController();
const IndexConstroller = require('../controllers/indexController');
const indexConstroller = new IndexConstroller();
const ProfileController = require('../controllers/profileController');
const profileController = new ProfileController;

const verifyToken = require('../models/verifyTokenModel');
const verifyPostAuth = require('../models/verifyPostAuthModel');
const verifyAdmin = require('../models/verifyAdminModel');
const verifyCity = require('../models/verifyCityModel');
const verifyLocation = require('../models/verifyLocationModel');
const verifiAdminStamp = require('../models/verifyAdminStampModel');

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
router.post('/login', loginAction.login);
router.post('/admin/postmarks/', verifyToken.tokenAuth, verifyAdmin.AdminAuth, upload.single('image'), locationAction.createPostmark);
router.get('/index/hot_cities', indexAction.showHotCities);
router.get('/index/latest_posts', indexAction.showLatestPosts);
router.get('/cities', cityAction.showCities);
router.get('/cities/:id/towns', townAction.showTowns);
router.get('/towns/:id/locations', locationAction.showLocations);
router.get('/locations/:id/postmark', locationAction.showPostmark);
router.get('/locations/:id/content', locationAction.showLocationInfo);
router.get('/postmarks/:id', locationAction.showPostmarkInfo);
router.get('/collections/cities', verifyToken.tokenAuth, collectionAction.showCollectionCountsFromCities);
router.get('/collections/locations', verifyToken.tokenAuth, collectionAction.showCollectionCountsFromLocations);
router.get('/collections/locations/:id/posts', verifyToken.tokenAuth, collectionAction.showCollectionPostsFromLocation);
router.post('/collections/posts', verifyToken.tokenAuth, collectionAction.updatePostCollectonStatus);
router.get('/profiles', verifyToken.tokenAuth, profileController.showUserProfile);
router.post('/stamps', verifyToken.tokenAuth, upload.single('image'), userStampsController.postStamp);
router.delete('/stamps/:id', verifyToken.tokenAuth, userStampsController.deleteStamp);
router.get('/posts', verifyToken.tokenAuth, userPostsController.showPost);
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
router.delete('/admin/stamps/:id', verifyToken.tokenAuth, verifyAdmin.AdminAuth, verifiAdminStamp.checkAdminStamp, indexConstroller.deleteStamp);
router.put('/admin/stamps/:id', verifyToken.tokenAuth, verifyAdmin.AdminAuth, verifiAdminStamp.checkAdminStamp, upload.single('image'), indexConstroller.putStamp);

module.exports = router;