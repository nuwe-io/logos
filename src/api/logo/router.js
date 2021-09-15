const express = require('express')
const router = express.Router()

const multer = require('multer')
const { getKeyFromAWS } = require('../shared/middlewares/fileManager')
const upload = multer({ dest: 'uploads/' })
const { add, list, get, remove, updateById, findByFileKey, bulkUpload, load } = require('./controller')
const { authorize, ADMIN } = require('../shared/middlewares/auth')

/**
 * @api {get} /logos/:fileKey Find logo file
 * @apiDescription Returns the requested file using the fileKey(name)
 * @apiName GetLogo
 * @apiGroup Logos
 * @apiPermission public
 *
 */
router.get('/:fileKey', findByFileKey)

/**
 * @api {post} /logos Add logo
 * @apiDescription Add the database object using the id
 * @apiName AddLogo
 * @apiGroup Logos
 * @apiPermission admin
 */
router.post('/', authorize(ADMIN), add)

/**
 * @api {post} /logos/withImage Add with image
 * @apiDescription Add a new database object + upload the logo image to AWS
 * @apiName AddImageLogo
 * @apiGroup Logos
 * @apiPermission admin
 */
router.post('/withImage/', authorize(ADMIN), upload.single('image'), getKeyFromAWS, add)

/**
 * @api {patch} /logos/{id} Upadte Logo
 * @apiDescription Upadate the database object using the id
 * @apiName Upadate
 * @apiGroup Logos
 * @apiPermission admin
 */
router.patch('/:id', authorize(ADMIN), updateById)
/**
 * @api {delete} /logos/{id} Delete Logo
 * @apiDescription Deleted the database object using the id
 * @apiName DeleteLogo
 * @apiGroup Logos
 * @apiPermission admin
 */
router.delete('/:id', authorize(ADMIN), remove)

/**
 * @api {get} /logos/all Find all
 * @apiDescription  Returns all the database objects
 * @apiName GetLogos
 * @apiGroup Logos
 * @apiPermission public
 */
router.get('/find/all', list)

/**
 * @api {get} /find/:id Find by Id
 * @apiDescription  Returns the database object looking by the id
 * @apiName GetObjectLogo
 * @apiGroup Logos
 * @apiPermission public
 */
router.get('/find/:id', get)

/**
 * @api {get} /logos/bulk Upload bulk logos
 * @apiDescription  Uploads a list of logos and creates the object at mongo
 * @apiName BulkUpload
 * @apiGroup Logos
 * @apiPermission admin
 */
router.post('/bulkUpload', authorize(ADMIN), bulkUpload)

module.exports = router
