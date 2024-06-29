const express = require('express')
const router = express.Router()

let userController = require('../app/controllers/user_controller')
this.userControllerObj = new userController()

let userMiddleware = require('../middleware/user_middleware')
let userMiddlewareObj = new userMiddleware()

let commonMiddleware = require('../middleware/common-middleware')
let commonMiddlewareObj = new commonMiddleware()

let middlewares = []
router.route('/getUser')
    .post(this.userControllerObj.getUser)

middlewares = [
    userMiddlewareObj.loginValidationRule(),
    commonMiddlewareObj.checkforerrors
]
router.route('/login')
    .post(middlewares, this.userControllerObj.login)

module.exports = router