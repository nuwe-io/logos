const express = require('express')
const router = express.Router()

const multer = require('multer')
const { getKeyFromAWS } = require('../shared/middlewares/fileManager')
const upload = multer({ dest: 'uploads/' })
const { add, findAll, findObj, deleteById, updateById, findByFileKey, bulkUpload } = require('./controller')
const { authorize, ADMIN } = require('../shared/middlewares/auth')

/**
 * @api {get} /logos/:fileKey
 * @apiDescription Returns the requested file using the fileKey(name)
 * @apiName GetLogo
 * @apiGroup Logos
 * @apiPermission public
 *
 */
router.get('/:fileKey', findByFileKey)

/**
 * @api {post} /logos
 * @summary Add the database object using the id
 * @apiName AddLogo
 * @apiGroup Logos
 * @apiPermission admin
 */
router.post('/', authorize(ADMIN), add)

/**
 * @api {post} /logos/withImage
 * @summary Add a new database object + upload the logo image to AWS
 * @apiName AddImageLogo
 * @apiGroup Logos
 * @apiPermission admin
 */
router.post('/withImage/', authorize(ADMIN), upload.single('image'), getKeyFromAWS, add)

/**
 * @api {put} /logos/{id}
 * @summary Upadate the database object using the id
 * @apiName Upadate
 * @apiGroup Logos
 * @apiPermission admin
 */
router.patch('/:id', authorize(ADMIN), updateById)
/**
 * @api {delete} /logos/{id}
 * @summary Deleted the database object using the id
 * @apiName DeleteLogo
 * @apiGroup Logos
 * @apiPermission admin
 */
router.delete('/:id', authorize(ADMIN), deleteById)

/**
 * @api {get} /logos/all
 * @summary  Returns all the database objects
 * @apiName GetLogos
 * @apiGroup Logos
 * @apiPermission public
 */
router.get('/find/all', findAll)

/**
 * GET /find/:id
 * @summary Returns the database object looking by the id
 * @tags Logos
 * @param {string} id.params.required - id
 */

/**
 * @api {get} /find/:id Find by Id
 * @summary  Returns the database object looking by the id
 * @apiName GetObjectLogo
 * @apiGroup Logos
 * @apiPermission public
 */
router.get('/find/:id', findObj)

/**
 * @api {get} /logos/bulk Upload bulk logos
 * @summary  Uploads a list of logos and creates the object at mongo
 * @apiName BulkUpload
 * @apiGroup Logos
 * @apiPermission admin
 */
router.post('/bulkUpload', bulkUpload)

module.exports = router
