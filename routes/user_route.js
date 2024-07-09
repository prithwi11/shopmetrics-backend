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

middlewares = [
    commonMiddlewareObj.validateToken,
    userMiddlewareObj.addUserValidationRule(),
    commonMiddlewareObj.checkforerrors
]
router.route('/add-user')
    .post(middlewares, this.userControllerObj.addAdminUser)

middlewares = [
    commonMiddlewareObj.validateToken,
    userMiddlewareObj.addRoleToUserValidationRule(),
    commonMiddlewareObj.checkforerrors
]
router.route('/add-role')
    .post(middlewares, this.userControllerObj.assignRoleToUser)
    
module.exports = router