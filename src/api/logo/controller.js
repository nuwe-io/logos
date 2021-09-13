const Logo = require('./model')
const catchAsync = require('../shared/utils/catchAsync')
const logos = require('../../../toUpload.json')
const { uploadFile, getFileStream } = require('../shared/services/aws')
const path = require('path')

exports.findAll = catchAsync(async (req, res) => {
  const data = await Logo.find({})
  res.status(200).json(data)
})

/**
 * Finds an object and returns the data associated Using
 * the _id property
 * @param {*}
 */
exports.findObj = catchAsync(async (req, res) => {
  const data = await Logo.findById(req.params.id)
  res.status(200).json(data)
})

exports.findByFileKey = catchAsync(async (req, res) => {
  const key = req.params.fileKey
  const readStream = getFileStream(key)
  readStream.pipe(res)
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
 * @returns
 */
exports.deleteById = catchAsync(async (req, res) => {
  await Logo.findOneAndDelete({ _id: req.params.id }, req.body)
  res.status(200).json({ message: 'Model deleted correctly' })
})

exports.bulkUpload = catchAsync(async (req, res) => {
  logos.skills.map(async (logo, index) => {
    const filePath = path.resolve(__dirname, '../../../img/' + logos.files[index])
    const file = {
      path: filePath,
      originalName: logos.files[index]
    }
    const fileResp = await uploadFile(file)
    logo.fileKey = fileResp.key
    await Logo.create(logo)
  })
  res.status(200).json({ message: 'Skills and iamges created correctly' })
})
