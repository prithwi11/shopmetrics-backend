const Model = require('./model')
const mongoose = require('mongoose')

class roleModel extends Model {
    constructor() {
        let roleSchema = new mongoose.Schema({
            role_name : {
                type : String,
            },
            added_timestamp : {
                type : Date,
                default : Date.now(),
            },
            updated_timestamp : {
                type : Date,
            },
            role_permission_mappings : {
                type : Object
            }
        })

        super('tbl_roles', roleSchema)
    }
}

module.exports = roleModel