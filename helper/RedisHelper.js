const redisFunc = class redisClass {
    constructor() {
        const redis = require('redis')
        this.client = redis.createClient()
        this.client.connect()
    }

    setDataRedis(key, data) {
        this.client.set(key, data)
    }
    fetchDataRedis(key) {
        return this.client.get(key)
    }
}

module.exports = redisFunc