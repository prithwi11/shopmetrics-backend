const Model = require('./model')

class userModel extends Model {
    constructor() {
        super(
            'tbl_users',
            {
                user_id : {
                    type : Number
                },
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
                role : {
                    type : String
                },
                added_timestamp : {
                    type : Date
                },
                updated_timestamp : {
                    type : Date
                }
            }
        )
    }
}

module.exports = userModel