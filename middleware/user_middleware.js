module.exports = class validatorCls { 
    constructor() {
        const { check } = require('express-validator')
        this.check = check
    }

    loginValidationRule() {
        return [
            this.check('email').trim().not().isEmpty().withMessage("Please provide email").isEmail().withMessage("Please provide valid email"),
            this.check('password').trim().not().isEmpty().withMessage("Please provide password")
        ]
    }

    addUserValidationRule() {
        return [
            this.check('email').trim().not().isEmpty().withMessage("Please provide email").isEmail().withMessage("Please provide valid email")
        ]
    }

    addRoleToUserValidationRule() {
        return [
            this.check('user_id').trim().not().isEmpty().withMessage("Please provide user_id").isInt().withMessage("Please provide valid user_id"),
            this.check('role_id').trim().not().isEmpty().withMessage("Please provide role_id").isInt().withMessage("Please provide valid role_id")
        ]
    }
}