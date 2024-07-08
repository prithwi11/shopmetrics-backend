'use strict'

const { Schema } = require('mongoose')

class Model {
    constructor(name, schema, options) {
        const connection = require('../../config/dbConnection')
        this.connectionObj = new connection
        let mongoose = this.connectionObj.connectToMongo()
        this.Model = mongoose.model(name, schema)
    }

    findAllByAny(dataObj) {
        return this.Model.find(dataObj)
    }

    findByAny(dataObj) {
        return this.Model.findOne(dataObj)
    }

    findByAnyAttribute(dataObj, attributeObj) {
        return this.Model.find(dataObj).project(attributeObj)
    }

    findByAnyOption(dataObj) {
        return this.Model.find(dataObj.where)
    }

    bulkUpload(dataObj) {
        return this.Model.insertMany(dataObj)
    }

    singleUpload(dataObj) {
        return this.Model.create(dataObj)
    }

    updateOne(filterObj, updateObj) {
        return this.Model.updateOne(filterObj, updateObj)
    }

    updateMany(filterObj, updateObj) {
        return this.Model.updateMany(filterObj, updateObj)
    }

    countDocuments(filterObj) {
        return this.Model.count(filterObj)
    }

    deleteByAny(filterObj) {
        return this.Model.deleteOne(filterObj)
    }
    deleteByMany (filterObj) {
        return this.Model.deleteMany(filterObj)
    }
}

module.exports = Model
