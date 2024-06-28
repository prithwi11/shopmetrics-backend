'use strict'

const { Schema } = require('mongoose')

class Model {
    constructor(name, schema, options) {
        const connection = require('../../config/dbConnection')
        this.connectionObj = new connection
        console.log('connection', this.connectionObj)
        let mongoose = this.connectionObj.connectToMongo()
        let newSchema = new Schema(schema)
        this.Model = mongoose.model(name, newSchema)
        console.log('model', this.Model)
    }

    findByAny(dataObj, attributeObj) {
        return this.Model.find(dataObj)
    }
}

module.exports = Model
