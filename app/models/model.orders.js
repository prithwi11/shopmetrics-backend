const { Decimal128 } = require('bson')
let Model = require('./model')
let mongoose = require('mongoose')

class orderModel extends Model {
    constructor() {
        let orderSchema = new mongoose.Schema({
            index : {
                type : Number,
            },
            order_id : {
                type : String
            },
            order_date : {
                type : Date
            },
            order_status : {
                type : String
            },
            order_fullfillment : {
                type : String
            },
            order_sales_channel : {
                type : String
            },
            style : {
                type : String
            },
            SKU : {
                type : String
            },
            category : {
                type : String
            },
            size : {
                type : String
            },
            ASIN : {
                type : String
            },
            order_qty : {
                type : Number
            },
            order_amount : {
                type : Decimal128
            },
            order_ship_city : {
                type : String,
            },
            order_ship_state : {
                type : String,
            },
            order_ship_postal_code : {
                type : String
            },
            fulfilled_by : {
                type : String
            }
        })

        super('tbl_orders', orderSchema)
    }


    fetchAllOrders(data) {
        let matchAggr = {}
        let limitAggr = {}
        let offsetAggr = {}
        let attributeAggr = {}
        let sortAggr = {}

        limitAggr = {$limit : parseInt(data.rows)}
        offsetAggr = {$skip : parseInt(data.first)}
        sortAggr = {$sort : {order_date : -1}}
        attributeAggr = {$project : {
            _id : 1,
            order_id : 1,
            order_date : 1,
            order_status : 1,
            order_ship_city : 1,
            order_amount : 1,
        }}

        return this.Model.aggregate(
            [
                sortAggr,
                limitAggr,
                offsetAggr,
                attributeAggr
            ]
        )
    }

    fetchOrderDetailsByID (data) {
        let matchAggr = {}
        matchAggr = {$match : {order_id : data.order_id}}
        return this.Model.aggregate(
            [
                matchAggr
            ]
        )
    }
}

module.exports = orderModel