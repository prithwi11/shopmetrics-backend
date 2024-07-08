module.exports = class roleController {
    constructor() {
        const roleModel = require('../models/model.roles')
        this.roleModelObj = new roleModel()
    }

    save = async(req, res) => {
        try {
            let response_dataset = {}
            let reqBody = req.body
            if (!reqBody.role_id) {
                let role_insert_obj = {}
                role_insert_obj['role_name'] = reqBody.role_name
                if (reqBody.permission_name) {
                    role_insert_obj['role_permission_mappings'] = {}
                    role_insert_obj['role_permission_mappings']['permission_name_arr'] = reqBody.permission_name_arr
                }
                let insert_role = await this.roleModelObj.singleUpload(role_insert_obj)
                if (insert_role) {
                    response_dataset.role_details = insert_role
                    global.Helpers.successStatusBuild(res, response_dataset, 'role inserted successfully')
                }
                else { 
                    global.Helpers.badRequestStatusBuild(res, 'Some error occurred!')
                }
            }
            else {
                let role_update_obj = {}
                let role_update_cond = {}
                role_update_cond['_id'] = reqBody.role_id

                role_update_obj['role_name'] = reqBody.role_name
                if (reqBody.permission_name) {
                    role_update_obj['role_permission_mappings'] = {}
                    role_update_obj['role_permission_mappings']['permission_name_arr'] = reqBody.permission_name_arr
                }

                let update_role = await this.roleModelObj.updateOne(role_update_cond, role_update_obj)
                global.Helpers.successStatusBuild(res, 'Role updated successfully!')
            }
        }
        catch (e) {
            console.log(e)
            global.Helpers.badRequestStatusBuild(res, 'Some error occurred!')
        }
    }
}