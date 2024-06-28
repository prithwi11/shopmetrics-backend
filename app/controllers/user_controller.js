module.exports = class userController {
    constructor() {
        const userModel = require('../models/model.users')
        this.userModelObj = new userModel()
        console.log('userModek', this.userModelObj)
    }

    getUser = async(req, res) => {
        try {
            // console.log('this', this.userModelObj)
            const userData = await this.userModelObj.findByAny({})
            console.log('user', userData)
            res.json(userData)
        }
        catch (e) {
            console.log(e)
        }
    }
}