const express = require('express')
const router = express.Router()

const RsgisterController = require('../controllers/registerController')
const registerController = new RsgisterController();

router.post('/register', registerController.postRegister)

module.exports = router;