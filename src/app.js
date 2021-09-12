const express = require('express')
const routes = require('./routes/router')

// Connect to documentDB
require('./shared/services/mongo')

const app = express()

// Set-up swagger documentation
const { options } = require('./shared/services/swaggerConfig')
const expressJSDocSwagger = require('express-jsdoc-swagger')

// trust first proxy
app.set('trust proxy', 1)

// parse json request body
app.use(express.json())

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

// API routese(routes)
app.use(routes)

// Documentation routes
expressJSDocSwagger(app)(options)

module.exports = app
