const Logo = require('./domain')
const catchAsync = require('../shared/utils/catchAsync')
const logos = require('../../../toUpload.json')
const { uploadFile, getFileStream } = require('../shared/services/aws')
const path = require('path')
const logger = require('../../config/logger')

/**
 * Get logos list
 * @public
 */
exports.list = catchAsync(async (req, res) => {
  const logos = await Logo.list(req.query)
  const transformedData = logos.map((logo) => logo.transform())
  res.status(200).json(transformedData)
})

/**
 * Get logo
 * @public
 */
exports.get = catchAsync(async (req, res) => {
  try {
    const logo = await Logo.get(req.params.id)
    console.log(logo)
    res.json(logo.transform())
  } catch (err) {
    console.log(err)
  }
})

exports.findByFileKey = catchAsync(async (req, res) => {
  const key = req.params.fileKey
  const logo = await Logo.findOne({ fileKey: key })
  if (!logo) {
    res.status(404).json({ message: 'We could not find your image' })
  } else {
    const readStream = getFileStream(key)
    readStream.pipe(res)
  }
})

/**
 * Adds an object with the Logo shchema to the MongoDB
 * @param {*}
 * @returns
 */
exports.add = catchAsync(async (req, res) => {
  await Logo.create(req.body)
  res.status(200).json({ message: 'Object correctly created' })
})

/**
 * Adds an object with the Logo  shchema + the ImageKey from AWS to the MongoDB
 * @param {*}
 * @returns
 */
exports.addWithImage = catchAsync(async (req, res) => {
  req.body.fileKey = res.locals.fileKey
  await Logo.create(req.body)
  res.status(200).json({ message: 'Object correctly created & Image correctly uploaded' })
})

/**
 * Finds and udates an object using the standar _id parameter
 * @param {*}
 * @returns
 */
exports.updateById = catchAsync(async (req, res) => {
  const data = await Logo.findOneAndUpdate({ _id: req.params.id }, req.body)
  res.status(200).json(data)
})

/**
 *  Finds and deletes an object using the standar _id parameter
 * @param {*}
 */
exports.remove = catchAsync(async (req, res) => {
  await Logo.findOneAndDelete({ _id: req.params.id }, req.body)
  res.status(200).json({ message: 'Model deleted correctly' })
})

/**
 * Loads the images in AWS and creates the mongo object
 * @priavate
 */
exports.bulkUpload = catchAsync(async (req, res) => {
  logos.map(async (logo) => {
    const filePath = path.resolve(__dirname, '../../../img/' + logo.files[0])
    const file = {
      path: filePath,
      originalName: logo.files[0]
    }
    const fileResp = await uploadFile(file)
    const logoObj = {
      name: logo.name,
      shortname: logo.shortname,
      url: logo.url,
      category: logo.category,
      fileKey: fileResp.key
    }
    await Logo.create(logoObj)
    logger.info(`Logo created: ${logo.name}`)
  })
  res.status(200).json({ message: 'Skills and iamges created correctly' })
})
