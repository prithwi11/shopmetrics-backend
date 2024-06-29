module.exports = class orderController {
    constructor() {
        let orderModel = require('../models/model.orders')
        this.orderModelObj = new orderModel()
    }

    list = async(req, res) => {
        try {
            let reqBody = req.body
            let response_dataset = {}
            let orderList = await this.orderModelObj.fetchAllOrders(reqBody)
            if (orderList.length > 0) {
                response_dataset.order_list = orderList
                global.Helpers.successStatusBuild(res, response_dataset, 'Order fetched successfully')
            }
            else {
                global.Helpers.successStatusBuild(res, [], 'No order found')
            }
        }
        catch (e) {
            console.log(e)
            global.Helpers.badRequestStatusBuild(res, 'Some error occurred!')
        }
    }

    detail = async(req, res) => {
        try {
            let reqBody = req.body
            let response_dataset = {}
            let orderDetails = await this.orderModelObj.fetchOrderDetailsByID(reqBody)
            if (orderDetails.length > 0) {
                response_dataset.order_details = orderDetails[0]
                global.Helpers.successStatusBuild(res, response_dataset, 'Order fetched successfully')
            }
            else {
                global.Helpers.successStatusBuild(res, [], 'No order found')
            }
        }
        catch (e) {
            console.log(e)
            global.Helpers.badRequestStatusBuild(res, 'Some error occurred!')
        }
    }
}