const express = require('express')
const router = express.Router()

const multer = require('multer')
const { getKeyFromAWS } = require('../shared/middlewares/fileManager')
const upload = multer({ dest: 'uploads/' })
const { add, findAll, findObj, deleteById, update, findByFileKey } = require('./controller')

/**
 * GET /logos/{fileKey}
 * @summary Returns the requested file using the fileKey(name)
 * @tags Logos
 * @param {string} fileKey.path.required - fileKey
 * @return {object} 200 - success response - mediaType/png
 * @return {object} 400 - Bad request response
 */
router.get('/:fileKey', findByFileKey)

/**
 * POST /logos
 * @summary Upload new logo image to AWS
 * @tags Logos
 */
router.post('/', upload.single('image'), getKeyFromAWS, add)

/**
 * PUT /logos/{id}
 * @summary Updated the databse object using the id
 * @tags Logos
 * @param {string} id.params.required - id
 */
router.put('/:id', update)

/**
 * DELETE /logos/{id}
 * @summary Deleted the database object using the id
 * @tags Logos
 * @param {string} id.params.required - id
 */
router.delete('/:id', deleteById)


/**
 * GET /logos/all
 * @summary Returns all the database objects 
 * @tags Logos, find
 */
router.get('/find/all', findAll)

/**
 * GET /find/:id
 * @summary Returns the database object looking by the id
 * @tags Logos, find
 * @param {string} id.params.required - id
 */
router.get('/find/:id', findObj)

module.exports = router
