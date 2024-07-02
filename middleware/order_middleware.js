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

    saveValidationRule() {
        return [
            this.check('order_id').trim().not().isEmpty().withMessage("Please provide order_id"),
            this.check('order_date').trim().not().isEmpty().withMessage("Please provide order_date"),
            this.check('order_status').trim().not().isEmpty().withMessage("Please provide order_status"),
            this.check('order_fullfillment').trim().not().isEmpty().withMessage("Please provide order_fullfillment"),
            this.check('style').trim().not().isEmpty().withMessage("Please provide style"),
            this.check('SKU').trim().not().isEmpty().withMessage("Please provide SKU"),
            this.check('category').trim().not().isEmpty().withMessage("Please provide category"),
            this.check('size').trim().not().isEmpty().withMessage("Please provide size"),
            this.check('ASIN').trim().not().isEmpty().withMessage("Please provide ASIN"),
            this.check('order_qty').trim().not().isEmpty().withMessage("Please provide order_qty"),
            this.check('order_amount').trim().not().isEmpty().withMessage("Please provide order_amount"),
            this.check('order_ship_city').trim().not().isEmpty().withMessage("Please provide order_ship_city"),
            this.check('order_ship_state').trim().not().isEmpty().withMessage("Please provide order_ship_state"),
            this.check('order_ship_postal_code').trim().not().isEmpty().withMessage("Please provide order_ship_postal_code"),
            this.check('fulfilled_by').trim().not().isEmpty().withMessage("Please provide fulfilled_by")
        ]
    }

    deleteValidationRule() {
        return [
            this.check('id').trim().not().isEmpty().withMessage("Please provide order_id")
        ]
    }
}