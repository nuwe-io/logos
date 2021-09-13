const { uploadFile } = require('../services/aws')

const fs = require('fs')
const util = require('util')
const catchAsync = require('../utils/catchAsync')
const unlinkFile = util.promisify(fs.unlink)

exports.getKeyFromAWS = catchAsync(async (req, res, next) => {
  const file = req.file

  const result = await uploadFile(file)

  await unlinkFile(file.path)
  res.locals.fileKey = result.Key
  next()
})
