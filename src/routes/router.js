const express = require('express')
const router = express.Router()
const logo = require('../logo/router')

router.use('/logos', logo)

module.exports = router
