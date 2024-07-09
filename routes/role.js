const express = require('express')
const router = express.Router()

let commonMiddleware = require('../middleware/common-middleware')
let commonMiddlewareObj = new commonMiddleware()

let roleMiddleware = require('../middleware/role_middleware')
let roleMiddlewareObj = new roleMiddleware()

let roleController = require('../app/controllers/roleController')
this.roleControllerObj = new roleController()

let middlewares = []

middlewares = [
    commonMiddlewareObj.validateToken,
    roleMiddlewareObj.addRoleValidationRule(),
    commonMiddlewareObj.checkforerrors
]
router.route('/save')
    .post(middlewares, this.roleControllerObj.save)

middlewares = [
    commonMiddlewareObj.validateToken,
    roleMiddlewareObj.addPermissionToRoleValidationRule(),
    commonMiddlewareObj.checkforerrors
]

router.route('/add-permissions')
    .post(middlewares, this.roleControllerObj.addPermissionToRole)

module.exports = router