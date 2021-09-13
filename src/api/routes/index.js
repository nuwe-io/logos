const express = require('express')
const router = express.Router()

const logo = require('../logo/router')
const user = require('../user/routes')
const auth = require('../auth/routes')

router.use('/logos', logo)
router.use('/users', user)
router.use('/auth', auth)

module.exports = router
