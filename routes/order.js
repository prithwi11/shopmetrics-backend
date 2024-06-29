const express = require('express')
const router = express.Router()

let commonMiddleware = require('../middleware/common-middleware')
let commonMiddlewareObj = new commonMiddleware()

let orderMiddleware = require('../middleware/order_middleware')
let orderMiddlewareObj = new orderMiddleware()

let orderController = require('../app/controllers/orderController')
this.orderControllerObj = new orderController()

let middlewares = []
middlewares = [
    commonMiddlewareObj.validateToken,
    orderMiddlewareObj.listValidationRule(),
    commonMiddlewareObj.checkforerrors
]
router.route('/list')
    .post(middlewares, this.orderControllerObj.list)

middlewares = [
    commonMiddlewareObj.validateToken,
    orderMiddlewareObj.detailsValidationRule(),
    commonMiddlewareObj.checkforerrors
]
router.route('/detail')
    .post(middlewares, this.orderControllerObj.detail)

module.exports = router