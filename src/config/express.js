const express = require('express')
const morgan = require('morgan')
const compress = require('compression')
const methodOverride = require('method-override')
const cors = require('cors')
const helmet = require('helmet')
const routes = require('../routes')
const { logs } = require('./vars')
const error = require('../shared/middlewares/error')
const expressJSDocSwagger = require('express-jsdoc-swagger')

/**
 * Express instanc
 * @public
 */
const app = express()

// request logging. dev: console | production: file
app.use(morgan(logs))

// gzip compression
app.use(compress())

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride())

// secure apps by setting various HTTP headers
app.use(helmet())

// enable CORS - Cross Origin Resource Sharing
app.use(cors())

// parse json request body
app.use(express.json())

// parse urlencoded request body

app.use(express.urlencoded({ extended: true }))

// mount api routes
app.use(routes)

// Documentation routes
const { options } = require('./swaggerConfig')
expressJSDocSwagger(app)(options)

// if error is not an instanceOf APIError, convert it.
app.use(error.converter)

// catch 404 and forward to error handler
app.use(error.notFound)

// error handler, send stacktrace only during development
app.use(error.handler)

module.exports = app
