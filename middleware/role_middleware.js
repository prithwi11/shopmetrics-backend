module.exports = class validatorCls {
    constructor() {
        const { check } = require('express-validator')
        this.check = check
    }

    addRoleValidationRule() {
        return [
            this.check('role_name').trim().not().isEmpty().withMessage("Please provide role name")
        ]
    }

    addPermissionToRoleValidationRule() {
        return [
            this.check('role_id').trim().not().isEmpty().withMessage("Please provide role id").isInt().withMessage("Please provide valid role id"),
            this.check('permissions').isArray().withMessage("Please provide valid permission")
        ]
    }
}