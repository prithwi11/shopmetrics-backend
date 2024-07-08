const { default: mongoose } = require('mongoose')
const Model = require('./model')

class userModel extends Model {
    constructor() {
        let userSchema = new mongoose.Schema({
            email : {
                type : String
            },
            password : {
                type : String
            },
            first_name : {
                type : String
            },
            last_name : {
                type : String
            },
            is_verified : {
                type : Boolean,
                default : false
            },
            user_role_mapping : {
                type : Object
            },
            added_timestamp : {
                type : Date,
                default : Date.now
            },
            updated_timestamp : {
                type : Date
            },
            last_login_timestamp : {
                type : Date
            }           
        })
        super(
            'tbl_users',
            userSchema
        )
    }
}

module.exports = userModel