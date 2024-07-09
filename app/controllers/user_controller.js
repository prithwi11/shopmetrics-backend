module.exports = class userController {
    constructor() {
        const userModel = require('../models/model.users')
        this.userModelObj = new userModel()

        const roleModel = require('../models/model.roles')
        this.roleModelObj = new roleModel()
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
                                if (checkEmail.user_role_mappings) {
                                    response_dataset.user_role_mappings = checkEmail.user_role_mappings
                                }

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

    addAdminUser = async(req, res) => {
        try {
            let response_dataset = {}
            let reqBody = req.body

            if (!reqBody.user_id) {
                let add_user_obj  = {}
                add_user_obj['email'] = reqBody.email
                add_user_obj['password'] = await global.Helpers.hashPassword('123456')
                add_user_obj['first_name'] = reqBody.first_name
                add_user_obj['last_name'] = reqBody.last_name
                if (reqBody.role_name) {
                    add_user_obj['user_role_mappings'] = {}
                    add_user_obj['user_role_mappings']['role_name'] = reqBody.role_name
                }
                
                let insertData = await this.userModelObj.singleUpload(add_user_obj)
                if (insertData) {
                    response_dataset.user_details = insertData
                    global.Helpers.successStatusBuild(res, response_dataset, 'User added successfully!')
                }
                else {
                    global.Helpers.badRequestStatusBuild(res, 'Some error occurred')    
                }
            }
            else {
                let update_user_obj = {}
                let update_user_cond = {}
                update_user_cond['_id'] = reqBody.user_id
                update_user_obj['email'] = reqBody.email
                update_user_obj['first_name'] = reqBody.first_name
                update_user_obj['last_name'] = reqBody.last_name
                if (reqBody.password) {
                    update_user_obj['password'] = await global.Helpers.hashPassword(reqBody.password)
                }
                if (reqBody.role_name) {
                    update_user_obj['user_role_mappings'] = {}
                    update_user_obj['user_role_mappings']['role_name'] = reqBody.role_name
                }
                let updateData = await this.userModelObj.updateOne(update_user_cond, update_user_obj)
                global.helpers.successStatusBuild(res, "User updated successfully")
            }            
        }
        catch (e) {
            console.log(e)
            global.Helpers.badRequestStatusBuild(res, 'Some error occurred')
        }
    }

    assignRoleToUser = async(req, res) => {
        try {
            let reqBody = req.body
            if (!reqBody.user_id) {
                global.Helpers.badRequestStatusBuild(res, 'User id not provided')
            }
            let user_details = await this.userModelObj.findByAny({_id : reqBody.user_id})
            if (user_details) {
                let role_id = reqBody.role_id
                let role_details = await this.roleModelObj.findByAny({_id : role_id})
                if (role_details) {
                    let user_update_obj = {}
                    user_update_obj['user_role_mappings']['role_name'] = role_details.role_name
                    user_update_obj['user_role_mappings']['permission_arr'] = role_details.permission_arr

                    await this.roleModelObj.updateOne({_id : reqBody.user_id}, {$set : user_update_obj})
                    global.Helpers.successStatusBuild(res, 'Role assigned successfully')
                }
                else {
                    global.Helpers.badRequestStatusBuild(res, 'Role not found')
                }
            }
            else {
                global.Helpers.badRequestStatusBuild(res, 'No user found')
            }
        }
        catch (e) {
            console.log(e)
            global.Helpers.badRequestStatusBuild(res, 'Some error occurred')
        }
    }
}