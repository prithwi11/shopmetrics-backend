const express = require('express')
const router = express.Router()

let userController = require('../app/controllers/user_controller')
this.userControllerObj = new userController()

router.route('/getUser')
    .post(this.userControllerObj.getUser)

module.exports = router