module.exports = class orderController {
    constructor() {
        let orderModel = require('../models/model.orders')
        this.orderModelObj = new orderModel()
    }

    list = async(req, res) => {
        try {
            let reqBody = req.body
            let response_dataset = {}
            let orderListFromRedis = await global.RedisHelper.fetchDataRedis('orderList')
            if (orderListFromRedis) {
                response_dataset.order_list = JSON.parse(orderListFromRedis)
                global.Helpers.successStatusBuild(res, response_dataset, 'Order fetched successfully')
            }
            else {
                let orderList = await this.orderModelObj.fetchAllOrders(reqBody)
                await global.RedisHelper.setDataRedis('orderList', JSON.stringify(orderList))
                if (orderList.length > 0) {
                    response_dataset.order_list = orderList
                    global.Helpers.successStatusBuild(res, response_dataset, 'Order fetched successfully')
                }
                else {
                    global.Helpers.successStatusBuild(res, [], 'No order found')
                }
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

    save = async(req, res) => {
        try {
            let reqBody = req.body
            let response_dataset = {}
            if (!reqBody.id) {
                let insert_obj = {}
                insert_obj['order_id'] = reqBody.order_id
                insert_obj['order_date'] = reqBody.order_date
                insert_obj['order_status'] = reqBody.order_status
                insert_obj['order_fullfillment'] = reqBody.order_fullfillment
                insert_obj['style'] = reqBody.style
                insert_obj['SKU'] = reqBody.SKU
                insert_obj['category'] = reqBody.category
                insert_obj['size'] = reqBody.size
                insert_obj['ASIN'] = reqBody.ASIN
                insert_obj['order_qty'] = reqBody.order_qty
                insert_obj['order_amount'] = reqBody.order_amount
                insert_obj['order_ship_city'] = reqBody.order_ship_city
                insert_obj['order_ship_state'] = reqBody.order_ship_state
                insert_obj['order_ship_postal_code'] = reqBody.order_ship_postal_code
                insert_obj['fulfilled_by'] = reqBody.fulfilled_by

                let insert_data = await this.orderModelObj.singleUpload(insert_obj)
                if (insert_data) {
                    let updatedList
                    let orderListRedisstr =  await global.RedisHelper.fetchDataRedis('orderList')
                    if (orderListRedisstr) {
                        let orderListRedis = JSON.parse(orderListRedisstr)
                        let redis_insert = {
                            '_id' : insert_data._id,
                            'order_id' : insert_data.order_id,
                            'order_date' : insert_data.order_date,
                            'order_status' : insert_data.order_status,
                            'order_amount' : insert_data.order_amount,
                            'order_ship_city' : insert_data.order_ship_city
                        }
                        updatedList = [redis_insert, ...orderListRedis]
                        await global.RedisHelper.setDataRedis('orderList', JSON.stringify(updatedList))    
                    }
                    response_dataset.order_details = insert_data
                }
                else {
                    response_dataset.order_details = []
                }
                global.Helpers.successStatusBuild(res, response_dataset, 'Order saved successfully')
            }
            else {
                let check_order_exists = await this.orderModelObj.findByAny({_id : reqBody.id})
                if (check_order_exists) {
                    let update_obj = {}
                    update_obj['order_id'] = reqBody.order_id
                    update_obj['order_date'] = reqBody.order_date
                    update_obj['order_status'] = reqBody.order_status
                    update_obj['order_fullfillment'] = reqBody.order_fullfillment
                    update_obj['style'] = reqBody.style
                    update_obj['SKU'] = reqBody.SKU
                    update_obj['category'] = reqBody.category
                    update_obj['size'] = reqBody.size
                    update_obj['ASIN'] = reqBody.ASIN
                    update_obj['order_qty'] = reqBody.order_qty
                    update_obj['order_amount'] = reqBody.order_amount
                    update_obj['order_ship_city'] = reqBody.order_ship_city
                    update_obj['order_ship_state'] = reqBody.order_ship_state
                    update_obj['order_ship_postal_code'] = reqBody.order_ship_postal_code
                    update_obj['fulfilled_by'] = reqBody.fulfilled_by

                    let update_data = await this.orderModelObj.updateOne({_id : reqBody.id}, update_obj)
                    if (update_data) {
                        let orderListStr = await global.RedisHelper.fetchDataRedis('orderList')
                        if (orderListStr) {
                            let orderList = JSON.parse(orderListStr)
                            let updatedList = []
                            let orderListFilter = orderList.filter(order => order._id != reqBody.id)
                            updatedList = [...orderListFilter, update_data]
                            await global.RedisHelper.setDataRedis('orderList', JSON.stringify(updatedList))
                        }
                        response_dataset.order_details = update_data
                    }
                    else {
                        response_dataset.order_details = []
                    }
                    global.Helpers.successStatusBuild(res, response_dataset, 'Order updated successfully')
                }
                else {
                    global.Helpers.successStatusBuild(res, [], 'No order found with this id')
                }
            }
            
        }
        catch (e) {
            console.log(e)
            global.Helpers.badRequestStatusBuild(res, 'Some error occurred!')
        }
    }

    delete = async(req, res) => {
        try {
            let response_dataset = {}
            let id = reqBody.id
            let delete_data = await this.orderModelObj.deleteByAny({_id : id})
            if (delete_data) {
                let orderListStr = await global.RedisHelper.fetchDataRedis('orderList')
                if (orderListStr) {
                    let orderList = JSON.parse(orderListStr)
                    let updatedList = []
                    let orderListFilter = orderList.filter(order => order._id != id)
                    updatedList = [...orderListFilter]
                    await global.RedisHelper.setDataRedis('orderList', JSON.stringify(updatedList))
                }
                global.Helpers.successStatusBuild(res, [], 'Order deleted successfully!')
            }
            else {
                global.Helpers.badRequestStatusBuild(res, [], 'Some error occurred!')
            }
        }
        catch (e) {
            console.log(e)
            global.Helpers.badRequestStatusBuild(res, 'Some error occurred!')
        }
    }
}