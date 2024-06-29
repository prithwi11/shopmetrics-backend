module.exports = class validatorCls { 
    constructor() {
        const { check } = require('express-validator')
        this.check = check
    }

    listValidationRule() {
        return [
            this.check('first').trim().not().isEmpty().withMessage("Please provide first"),
            this.check('rows').trim().not().isEmpty().withMessage("Please provide rows")
        ]
    }

    detailsValidationRule() {
        return [
            this.check('order_id').trim().not().isEmpty().withMessage("Please provide order id")
        ]
    }
}