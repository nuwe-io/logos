const S3 = require('aws-sdk/clients/s3')
const fs = require('fs')
const { aws } = require('../../../config/vars')

const bucketName = aws.bucket
const region = aws.region
const accessKey = aws.key
const secretKey = aws.secret

const s3 = new S3({
  region,
  accessKey,
  secretKey
})

/**
 * S3 file uploader funciton
 * @param {object} file Object received from multer
 * @returns {Promise}
 */
exports.uploadFile = (file) => {
  const fileContent = fs.readFileSync(file.path)

  const uploadParams = {
    Bucket: bucketName,
    Body: fileContent,
    Key: file.originalName
    //ContentType: file.mimetype
  }

  return s3.upload(uploadParams).promise()
}


/**
 * Returns the image/svg data from amazon
 * @param {string} fileKey - fileKey parameter got from amazon
 * @returns
 */
exports.getFileStream = (fileKey) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  }

  return s3.getObject(downloadParams).createReadStream()
}
