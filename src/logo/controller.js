const Logo = require('./model')
const catchAsync = require('../shared/utils/catchAsync')
const { getFileStream } = require('../shared/services/aws')

exports.findAll = () => async (req, res) => {
  const data = await Logo.find({})
  res.status(200).json(data)
}

/**
 * Finds an object and returns the data associated Using
 * the _id property
 * @param {*}
 */
exports.findObj = () => async (req, res) => {
  const data = await Logo.findById(req.params.id)
  res.status(200).json(data)
}

exports.findByName = () => async (req, res) => {
  const data = await Logo.findOne({ name: req.params.name })
  res.status(200).json(data)
}

/**
 * Adds an object with the User shchema to the MongoDB
 * @param {*}
 * @returns
 */
exports.add = () =>
  catchAsync(async (req, res) => {
    req.body = res.locals.fileKey
    const data = await Logo.create(req.body)
    res.status(200).json(data)
  })

/**
 * Finds and udates an object using the standar _id parameter
 * @param {*}
 * @returns
 */
exports.update = () =>
  catchAsync(async (req, res) => {
    const data = await Logo.findOneAndUpdate({ _id: req.params.id }, req.body)
    res.status(200).json(data)
  })

/**
 *  Finds and deletes an object using the standar _id parameter
 * @param {*}
 * @returns
 */
exports.deleteById = () =>
  catchAsync(async (req, res) => {
    await Logo.findOneAndDelete({ _id: req.params.id }, req.body)
    res.status(200).json({ message: 'Model deleted correctly' })
  })

exports.getImageFromAWSKey = () =>
  catchAsync(async (req, res) => {
    const data = await Logo.findById(req.params.id)
    const key = data.fileKey
    const readStream = getFileStream(key)
    readStream.pipe(res)
  })
