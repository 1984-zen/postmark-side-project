const express = require('express');
const router = express.Router();

const RsgisterController = require('../controllers/registerController');
const registerController = new RsgisterController();
const LoginController = require('../controllers/loginController');
const loginController = new LoginController();

router.post('/register', registerController.postRegister)
router.post('/login', loginController.postLogin);

module.exports = router;