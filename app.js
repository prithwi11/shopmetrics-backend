const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended : true
}))

require('dotenv').config()

const ConnectionC = require('./config/dbConnection');
global.Connection_mynode = new ConnectionC();
global.Connection_mynode.connectToMongo();

global.CONFIG = require('./config/env/' + process.env.APP_ENV)
let CommonFunction = require('./helper/CommonHelper')
global.Helpers = new CommonFunction()

let userRoute = require('./routes/user_route')
app.use('/api/v1/user', userRoute)

app.listen(process.env.PORT, () => {
    console.log(`App is listening on http://localhost:${process.env.PORT}`)
})

module.exports = app
