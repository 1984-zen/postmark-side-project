const express = require('express');
const router = express.Router();
const multer = require('multer');
const { info } = require("../models/logger");
// call our new /models/logger.js to log an info message
router.use(function timeLog(req, res, next) {
    info(JSON.stringify({
        user_request: req.method,
        url: req.url
    }));
    next();
});

const registAction = require('../controllers/regist');
const loginAction = require('../controllers/login');
const indexAction = require('../controllers/index');
const locationAction = require('../controllers/locations');
const cityAction = require('../controllers/cities');
const townAction = require('../controllers/towns');
const collectionAction = require('../controllers/collections');
const postAction = require('../controllers/posts');
const profileAction = require('../controllers/profiles');
const adminAction = require('../controllers/admin');

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

router.post('/regist', registAction.regist);
router.post('/login', loginAction.login);
router.get('/index/hot_cities', indexAction.showHotCities);
router.get('/index/latest_posts', indexAction.showLatestPosts);
router.get('/cities', cityAction.showCities);
router.get('/cities/:id/towns', townAction.showTowns);
router.get('/towns/:id/locations', locationAction.showLocations);
router.get('/locations/:id/location_introduce', locationAction.showLocationIntroduce);
router.get('/locations/:id/history_postmark_list', locationAction.showLocationPostmarkList);
router.get('/locations/:id/posts', locationAction.showLocationPosts);
router.get('/postmarks/:id', locationAction.showLocationPostmarkIntroduce);
router.get('/collections/cities', verifyToken.tokenAuth, collectionAction.showCollectionCountsFromCities);
router.get('/collections/locations', verifyToken.tokenAuth, collectionAction.showCollectionCountsFromLocations);
router.get('/collections/locations/:id/posts', verifyToken.tokenAuth, collectionAction.showCollectionPostsFromLocation);
router.post('/collections/posts', verifyToken.tokenAuth, collectionAction.updatePostCollectonStatus);
router.get('/posts/:id', postAction.showPost);
router.put('/posts/:id', verifyToken.tokenAuth, verifyPostAuth.verifyPostAuth, postAction.updatePost);
router.delete('/posts/:id', verifyToken.tokenAuth, verifyPostAuth.verifyPostAuth, postAction.deletePost);
router.post('/posts', verifyToken.tokenAuth, upload.single('image'), postAction.createPost);
router.get('/profiles/:id', profileAction.showProfile);
router.put('/profiles/:id', verifyToken.tokenAuth, upload.single('image'), profileAction.updateProfile);

router.post('/admin/distribute', verifyToken.tokenAuth, verifyAdmin.AdminAuth, upload.single('image'), adminAction.createDistributeByAdmin);
router.put('/admin/distribute/:id', verifyToken.tokenAuth, verifyAdmin.AdminAuth, upload.single('image'), adminAction.updateDistributeByAdmin);
router.delete('/admin/distribute/:id', verifyToken.tokenAuth, verifyAdmin.AdminAuth, upload.single('image'), adminAction.deleteDistributeByAdmin);
router.post('/admin/city', verifyToken.tokenAuth, verifyAdmin.AdminAuth, upload.single('image'), adminAction.createCityByAdmin);
router.put('/admin/city/:id', verifyToken.tokenAuth, verifyAdmin.AdminAuth, upload.single('image'), adminAction.updateCityByAdmin);
router.delete('/admin/city/:id', verifyToken.tokenAuth, verifyAdmin.AdminAuth, upload.single('image'), adminAction.deleteCityByAdmin);
router.post('/admin/town', verifyToken.tokenAuth, verifyAdmin.AdminAuth, adminAction.createTownByAdmin);
router.put('/admin/town/:id', verifyToken.tokenAuth, verifyAdmin.AdminAuth, adminAction.updateTownByAdmin);
router.delete('/admin/town/:id', verifyToken.tokenAuth, verifyAdmin.AdminAuth, adminAction.deleteTownByAdmin);
router.post('/admin/location', verifyToken.tokenAuth, verifyAdmin.AdminAuth, adminAction.createLocationByAdmin);
router.put('/admin/location/:id', verifyToken.tokenAuth, verifyAdmin.AdminAuth, adminAction.updateLocationByAdmin);
router.delete('/admin/location/:id', verifyToken.tokenAuth, verifyAdmin.AdminAuth, adminAction.deleteLocationByAdmin);
router.post('/admin/locations/postmark', verifyToken.tokenAuth, verifyAdmin.AdminAuth, upload.single('image'), adminAction.createLocationPostmarkByAdmin);
router.put('/admin/postmark/:id', verifyToken.tokenAuth, verifyAdmin.AdminAuth, upload.single('image'), adminAction.updateLocationPostmarkByAdmin);
router.delete('/admin/postmark/:id', verifyToken.tokenAuth, verifyAdmin.AdminAuth, upload.single('image'), adminAction.deleteLocationPostmarkByAdmin);

module.exports = router;