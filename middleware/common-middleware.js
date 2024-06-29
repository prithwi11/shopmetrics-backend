module.exports = class validatorCls {
    constructor() {
        const { validationResult } = require('express-validator')
        this.validationResult = validationResult
    }

    checkforerrors = async(req,res,next)=>{
        const errors = this.validationResult(req);
        if (!errors.isEmpty()) {
            let api_var = {
                'version': global.CONFIG.constants.API_VERSION,
                'developer': global.CONFIG.constants.API_DEVELOPER
            };
            let response_raws = {};
            let errorVal = errors.array();
            response_raws.message = errorVal[0].msg;
            response_raws.data = errors.array();
            response_raws.publish = api_var;
            if(errorVal[0].msg == 'Please update your app.') {
                res.status(global.CONFIG.constants.HTTP_RESPONSE_UPGRADE_REQUIRED);
            } else {
                res.status(global.CONFIG.constants.HTTP_RESPONSE_BAD_REQUEST);
            }
            res.send({ response: response_raws});
        } else {   
            next();
        }
    }

    validateToken = async(req, res, next) => {
        if (req.headers.authorization) {
            let token = req.headers.authorization
            if (token.startsWith('Bearer ') || token.startsWith('bearer ')) {
                token = token.slice(7, token.length)
            } 
            if (token) {
                global.Helpers.verifyAccessToken(token)
                    .then(() => {
                        next()
                    })
                    .catch ((err) => {
                        global.Helpers.forbiddenStatusBuild(res, 'Invalid Token. Access Forbidden.');
                    })
            }
            else {
                global.Helpers.forbiddenStatusBuild(res, 'Invalid Token. Access Forbidden.');    
            }
        }
        else {
            global.Helpers.forbiddenStatusBuild(res, 'Invalid Token. Access Forbidden.');
        }
    }
}