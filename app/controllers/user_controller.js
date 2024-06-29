module.exports = class userController {
    constructor() {
        const userModel = require('../models/model.users')
        this.userModelObj = new userModel()
    }

    getUser = async(req, res) => {
        try {
            // console.log('this', this.userModelObj)
            const userData = await this.userModelObj.findByAny({})
            res.json(userData)
        }
        catch (e) {
            console.log(e)
        }
    }

    login = async(req, res) => {
        try {
            let response_dataset = {}
            const checkEmail = await this.userModelObj.findByAny({email : req.body.email})
            if (checkEmail) {
                let password = req.body.password
                let hashPassword = checkEmail.password

                if (await global.Helpers.comparePassword(password, hashPassword)) {
                    let tokenData = {
                        userId : await global.Helpers.encrypt(checkEmail._id),
                        email : checkEmail.email
                    }
                    let token = await global.Helpers.createAccessToken(tokenData)
                    if (token) {
                        let refreshToken = await global.Helpers.createRefreshToken(tokenData)
                        if (refreshToken) {
                            let last_login_time = await global.Helpers.getCurrentTimestampUTC()
                            let update_last_login_time = await this.userModelObj.updateOne({_id : checkEmail._id}, {$set : {last_login_timestamp : last_login_time}})

                            if (update_last_login_time) {
                                response_dataset.token = token
                                response_dataset.refreshToken = refreshToken
                                response_dataset.token_type = 'Bearer'
                                response_dataset.user_id = checkEmail._id
                                response_dataset.first_name = checkEmail.first_name
                                response_dataset.last_name = checkEmail.last_name
                                response_dataset.email = checkEmail.email

                                return global.Helpers.successStatusBuild(res, response_dataset, 'Login successfully!')
                            }
                            else {
                                global.Helpers.successStatusBuild(res, 'Unable to store login details!')
                            }
                        }
                    }
                }
                else {
                    global.Helpers.successStatusBuild(res, 'Please provide correct password!')
                }
            }
            else {
                global.Helpers.successStatusBuild(res, 'Email not found')
            }
        }
        catch (e) {
            console.log(e)
            global.Helpers.badRequestStatusBuild(res, 'Some error occurred')
        }
    }
}