const Model = require('./model')
const mongoose = require('mongoose')

class permissionModel extends Model {
    constructor() {
        const permissionSchema = new mongoose.Schema({
            permission_name : {
                type : String,
            },
            added_timestamp : {
                type : Date,
                default : Date.now()
            },
            updated_timestamp : {
                type : Date
            }
        })

        super('tbl_permissions', permissionSchema)
    }
}