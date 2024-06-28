'use strict';

const mongoose = require('mongoose');
require('dotenv').config();

class ConnectionClass {
    connectToMongo() {
        mongoose.connect(`${process.env.DATABASE_URL}${process.env.DATABASE_NAME}`)
        return mongoose
    }
}

module.exports = ConnectionClass;
