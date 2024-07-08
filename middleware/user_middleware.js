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
}