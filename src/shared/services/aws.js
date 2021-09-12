const S3 = require('aws-sdk/clients/s3')
const fs = require('fs')
require('dotenv').config()

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKey = process.env.AWS_BUCKET_ACCESS_KEY
const secretKey = process.env.AWS_BUCKET_SECRET_KEY

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
    Key: file.originalname
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
