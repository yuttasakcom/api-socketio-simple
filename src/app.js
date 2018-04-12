const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const ratelimit = require('./middleware/ratelimit')
const mongoose = require('mongoose')

const dotenv = require('dotenv')
dotenv.config()

const app = express()

app.enable('trust proxy')
app.disable('x-powered-by')

app.set('trust proxy', 1)
app.set('port', process.env.PORT || '3000')

app.use(helmet())
app.use(ratelimit())
app.use(cors())
app.use(logger('common'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

const mongodb = process.env.MONGO_HOST || 'mongodb://localhost:27017/apis'
mongoose.Promise = global.Promise
mongoose.connect(mongodb)

const routes = require('./routes')
app.use(routes)

module.exports = app
