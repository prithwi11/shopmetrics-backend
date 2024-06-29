const commonFunc = class CommonCls {
    constructor() {
        const Cryptr = require('cryptr')
        this.cryptr = new Cryptr('1')
        const bcrypt = require('bcrypt')
        this.bcrypt = bcrypt
        this.api_var = {
			'version': global.CONFIG.constants.API_VERSION,
			'developer': global.CONFIG.constants.API_DEVELOPER
		};
    }

    badRequestStatusBuild(res, msg, dataset = []) {
        let response_raws = {};
        if (Object.keys(dataset).length === 0) {
            dataset = {};
        }
        response_raws.data = dataset;
        this.status = {
            'message': msg,
            'action_status': false
        };
        response_raws.status = this.status;
        response_raws.publish = this.api_var;
        response_raws.status_code = global.CONFIG.constants.HTTP_RESPONSE_SOME_ERROR_OCCURRED
        res.status(global.CONFIG.constants.HTTP_RESPONSE_SOME_ERROR_OCCURRED);
        res.send({ response: response_raws});
    }
    
    unauthorizedStatusBuild(res, msg,dataset = []) {
        let response_raws = {};
        response_raws.message = msg;
        if (Object.keys(dataset).length === 0) {
            dataset = {};
        }
        response_raws.data = dataset;
        response_raws.publish = this.api_var;
        res.status(global.CONFIG.constants.HTTP_RESPONSE_UNAUTHORIZED);
        res.send({ response: response_raws});
    }
    
    forbiddenStatusBuild(res, msg,dataset = []) {
        let response_raws = {};
        if (Object.keys(dataset).length === 0) {
            dataset = {};
        }
        response_raws.data = dataset;
        this.status = {
            'message': msg,
            'action_status': false
        };
        response_raws.status = this.status;
        response_raws.publish = this.api_var;
        res.status(global.CONFIG.constants.HTTP_RESPONSE_UNAUTHORIZED);
        res.send({ response: response_raws});
    }
    
    successStatusBuild(res, dataset, msg) {
        let response_raws = {};
        if (Object.keys(dataset).length === 0) {
            dataset = {};
        }
        response_raws.data = dataset;
        this.status = {
            'message': msg,
            'action_status': true
        };
        response_raws.status = this.status;
        response_raws.publish = this.api_var;
        res.status(global.CONFIG.constants.HTTP_RESPONSE_OK);
        res.send({ response: response_raws});
    }
    
    notAcceptableStatusBuild(res, msg) {
        let response_raws = {};
        let response_dataset = [];
        response_raws.message = msg;
        response_raws.data = response_dataset;
        response_raws.publish = this.api_var;
        res.status(global.CONFIG.constants.HTTP_RESPONSE_NOT_ACCEPTABLE);
        res.send({ response: {"raws":response_raws}});
    }
    
    methodNotAllowedStatusBuild(res, msg) {
        let response_raws = {};
        let response_dataset = [];
        response_raws.message = msg;
        response_raws.data = response_dataset;
        response_raws.publish = this.api_var;
        res.setHeader('content-type', 'application/json');
        res.status(global.CONFIG.constants.HTTP_RESPONSE_METHOD_NOT_ALLOWED);
        res.send({ response: {"raws":response_raws}});
    }
    
    upgradeRequiredStatusBuild(res, msg, dataset = []) {
        let response_raws = {};
        response_raws.message = msg;
        if (Object.keys(dataset).length === 0) {
            dataset = [];
        }
        response_raws.data = dataset;
        response_raws.publish = this.api_var;
        res.status(global.CONFIG.constants.HTTP_RESPONSE_UPGRADE_REQUIRED);
        res.send({ response: {"raws":response_raws}});
    }

    getCurrentTimestampUTC() {
        let moment = require('moment-timezone');
		let date = new Date();
		const dateNew = moment.utc(date, null).tz(process.env.TZ).format('YYYY-MM-DD HH:mm:ss');
		return dateNew
    }


    hashPassword(passsword) {
		let salt = this.bcrypt.genSaltSync(10);
		let hash = this.bcrypt.hashSync(passsword, salt);
		return hash;
	}


	// For Password Decryption
	comparePassword(password, hash) {
		let comparePwdStatus = false;
		if (this.bcrypt.compareSync(password, hash)) {
			comparePwdStatus = true;
		}
		return comparePwdStatus;
	}

    encrypt(id) {
        let encryptedId = this.cryptr.encrypt(id)
        return encryptedId
    }
    decrypt(encryptedId) {
        let decryptedId = this.cryptr.decrypt(encryptedId)
        return decryptedId
    }

    createAccessToken(data) {
        const jwt = require('jsonwebtoken')
        const accessToken = jwt.sign(data, global.CONFIG.JWTSETTINGS.accessTokenKey, {
            expiresIn: global.CONFIG.JWTSETTINGS.accessTokenExpire,
            algorithm: global.CONFIG.JWTSETTINGS.jwtAlgorithm
        })
        return accessToken
    }

    createRefreshToken (data) {
        const jwt = require('jsonwebtoken')
        const refreshToken = jwt.sign(data, global.CONFIG.JWTSETTINGS.refreshTokenKey, {
            expiresIn : global.CONFIG.JWTSETTINGS.refreshTokenExpire,
            algorithm : global.CONFIG.JWTSETTINGS.jwtAlgorithm
        })
        return refreshToken
    }

    verifyAccessToken (token) {
        const jwt = require('jsonwebtoken')
        const decoded = jwt.verify(token, global.CONFIG.JWTSETTINGS.accessTokenKey)
        return decoded
    }
}

module.exports = commonFunc
