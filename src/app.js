const express = require('express')
const routes = require('./routes/router')

// Connect to documentDB
require('./shared/services/mongo')

const app = express()

app.set('trust proxy', 1) // trust first proxy

// parse json request body
app.use(express.json())

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }))

app.use(routes)

module.exports = app
