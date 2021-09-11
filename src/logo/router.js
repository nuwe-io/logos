const express = require('express')
const router = express.Router()

const multer = require('multer')
const { getKeyFromAWS } = require('../shared/middlewares/fileManager')
const upload = multer({ dest: 'uploads/' })
const { add, findAll, findObj, deleteById, update, findByName, getImageFromAWSKey } = require('./controller')

router.get('/:id', findObj)
router.post('/', upload.single('image'), getKeyFromAWS, add)
router.patch('/:id', update)
router.delete('/:id', deleteById)

router.get('/name/:name', findByName)
router.get('/src/:id', getImageFromAWSKey)

router.get('/all', findAll)

module.exports = router
