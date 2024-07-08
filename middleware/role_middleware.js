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
}