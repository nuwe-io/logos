const express = require('express')
const router = express.Router()
const logo = require('../logo/router')

router.use('/logos', logo)

router.use('/', (req, res) => {
  res.json('This is the nuwe logos api')
})

module.exports = router
