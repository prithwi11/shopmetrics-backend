module.exports = class permissionController {
    constructor() {
        const permissionModel = require('../models/model.permissions')
        this.permissionModelObj = new permissionModel()
    }

    save = async(req, res) => {
        try {
            
        }
        catch (e) {
            console.log(e)
            global.Helpers.badRequestStatusBuild(res, 'Some error occurred!')
        }
    }
}